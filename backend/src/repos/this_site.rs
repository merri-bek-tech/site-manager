use crate::infra::db::MainDb;
use rocket_db_pools::Connection;

use super::entities::Site;

pub struct ThisSiteRepo {}

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
    ) -> Result<(), sqlx::Error> {
        let existing_site = self.get_site(db).await?;

        // let site = sqlx::query_as!(Site, "INSERT INTO sites (name) VALUES (?)", name)
        //     .fetch_one(&mut **db)
        //     .await?;

        return Ok(());
    }
}
