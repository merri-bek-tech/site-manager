use crate::{infra::db::MainDb, repos::helpers::SITE_CONFIG_ID};
use p2panda_core::PrivateKey;
use thiserror::Error;

pub struct ThisP2PandaNodeRepo {}

#[derive(Debug, Error, Responder)]
pub enum ThisP2PandaNodeError {
    // #[error("Internal server error: {0}")]
    // #[response(status = 500)]
    // InternalServerError(String),
}

impl ThisP2PandaNodeRepo {
    pub fn init() -> Self {
        ThisP2PandaNodeRepo {}
    }

    pub async fn get_private_key(&self, db: &MainDb) -> Result<PrivateKey, ThisP2PandaNodeError> {
        let private_key = PrivateKey::new();
        let mut connection = db.sqlite_pool().acquire().await.unwrap();

        let _region = sqlx::query!(
            "
            SELECT *
            FROM site_configs
            WHERE site_configs.id = ?
            LIMIT 1
            ",
            SITE_CONFIG_ID
        )
        .fetch_one(&mut *connection)
        .await;

        println!("Did a dummy DB query to pretend to get the private key");

        return Ok(private_key);
    }
}
