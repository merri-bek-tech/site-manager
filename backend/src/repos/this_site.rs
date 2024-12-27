use super::entities::Site;
use crate::infra::db::MainDb;
use rocket_db_pools::Connection;
use thiserror::Error;
use uuid::Uuid;

pub struct ThisSiteRepo {}

#[derive(Debug, Error, Responder)]
pub enum ThisSiteError {
    #[error("Internal server error: {0}")]
    #[response(status = 500)]
    InternalServerError(String),

    #[error("Cannot create site")]
    #[response(status = 409)]
    CannotCreate(String),

    #[error("Site not found")]
    #[response(status = 404)]
    NotFound(String),
}

const SITE_CONFIG_ID: i32 = 0;

impl ThisSiteRepo {
    // pub async fn create_site(&self, name: &str) -> Result<(), sqlx::Error> {
    //     // sqlx::query!("INSERT INTO site_configs (name) VALUES (?)", name)
    //     //     .execute(&self.db)
    //     //     .await
    //     //     .map(|_| ())
    // }

    pub fn init() -> Self {
        ThisSiteRepo {}
    }

    pub async fn get_site(&self, db: &mut Connection<MainDb>) -> Result<Site, ThisSiteError> {
        let site = sqlx::query_as!(
            Site,
            "
            SELECT sites.id as id, sites.name as name
            FROM sites
            INNER JOIN site_configs ON site_configs.this_site_id = sites.id
            WHERE site_configs.id = ? LIMIT 1
            ",
            SITE_CONFIG_ID
        )
        .fetch_one(&mut ***db)
        .await
        .map_err(|e| match e {
            sqlx::Error::RowNotFound => ThisSiteError::NotFound("Site not found".to_string()),
            _ => ThisSiteError::InternalServerError("Database error".to_string()),
        })?;

        return Ok(site);
    }

    pub async fn create_site(&self, db: &mut Connection<MainDb>, name: String) -> Result<Site, ThisSiteError> {
        let existing = self.get_site(db).await;

        if existing.is_ok() {
            println!("Site already exists");
            // There is already a site, don't create another
            return Err(ThisSiteError::CannotCreate("Site already exists".to_string()));
        }

        println!("Creating site");

        let site_id = Uuid::new_v4().to_string();

        let _site = sqlx::query!("INSERT INTO sites (id, name) VALUES (?, ?)", site_id, name)
            .execute(&mut ***db)
            .await
            .map_err(|_| ThisSiteError::InternalServerError("Database error".to_string()))?;

        let _site_config = sqlx::query!("UPDATE site_configs SET this_site_id = ? WHERE id = ?", site_id, SITE_CONFIG_ID)
            .execute(&mut ***db)
            .await
            .map_err(|_| ThisSiteError::InternalServerError("Database error".to_string()))?;

        println!("Created site");

        return self.get_site(db).await;
    }
}
