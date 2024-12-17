use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct SiteRegistration {
    pub name: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct SiteNotification {
    pub notification: String,
}

#[derive(Serialize, Deserialize)]
pub enum SiteMessages {
    SiteRegistration(SiteRegistration),
    SiteNotification(SiteNotification),
}
