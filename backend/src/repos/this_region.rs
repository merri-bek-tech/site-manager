use super::entities::Region;
use crate::infra::db::MainDb;
use rocket::serde::Deserialize;
use rocket_db_pools::Connection;
use thiserror::Error;

pub struct ThisRegionRepo {}

#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct CreateRegionData {
    name: String,
    description: String,
}

#[derive(Debug, Error, Responder)]
pub enum ThisRegionError {
    #[error("Internal server error: {0}")]
    #[response(status = 500)]
    InternalServerError(String),
    // #[error("Cannot create site")]
    // #[response(status = 409)]
    // CannotCreate(String),
}

impl ThisRegionRepo {
    pub fn init() -> Self {
        ThisRegionRepo {}
    }

    pub async fn create_region(&self, _db: &mut Connection<MainDb>, _data: CreateRegionData) -> Result<Region, ThisRegionError> {
        return Err(ThisRegionError::InternalServerError("NOT IMPLEMENTED ERROR".to_string()));
    }
}
