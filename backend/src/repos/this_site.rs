use super::entities::Site;
use crate::infra::db::MainDb;
use rocket_db_pools::Connection;
use thiserror::Error;

pub struct ThisSiteRepo {}

#[derive(Debug, Error)]
pub enum ThisSiteError {
    #[error("DbError: {0}")]
    DbError(sqlx::Error),

    #[error("Cannot create site")]
    CannotCreate,
}

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

    pub async fn get_site(&self, mut db: Connection<MainDb>) -> Result<Site, sqlx::Error> {
        let site = sqlx::query_as!(Site, "SELECT sites.id as id, sites.name as name FROM sites INNER JOIN site_configs ON site_configs.this_site_id = sites.id LIMIT 1")
            .fetch_one(&mut **db)
            .await?;

        return Ok(site);
    }

    pub async fn create_site(
        &self,
        mut db: Connection<MainDb>,
        name: String,
    ) -> Result<(), ThisSiteError> {
        let existing = sqlx::query_as!(Site, "SELECT sites.id as id, sites.name as name FROM sites INNER JOIN site_configs ON site_configs.this_site_id = sites.id LIMIT 1")
            .fetch_one(&mut **db)
            .await;

        if existing.is_ok() {
            println!("Site already exists");
            // There is already a site, don't create another
            return Err(ThisSiteError::CannotCreate);
        }

        println!("Creating site");

        let _site = sqlx::query!("INSERT INTO sites (id, name) VALUES (?, ?)", "1", name)
            .execute(&mut **db)
            .await
            .map_err(|e| ThisSiteError::DbError(e))?;

        println!("Created site");

        return Ok(());
    }
}
