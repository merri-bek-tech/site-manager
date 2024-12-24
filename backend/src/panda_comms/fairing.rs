use rocket::fairing::{Fairing, Info, Kind};
use rocket::{Orbit, Rocket};

use crate::panda_comms::container::P2PandaContainer;

#[derive(Default)]
pub struct P2PandaCommsFairing {}

#[rocket::async_trait]
impl Fairing for P2PandaCommsFairing {
    fn info(&self) -> Info {
        Info {
            name: "P2PandaCommsFairing",
            kind: Kind::Liftoff | Kind::Singleton,
        }
    }

    async fn on_liftoff(&self, rocket: &Rocket<Orbit>) {
        if let Some(container) = rocket.state::<P2PandaContainer>() {
            if let Err(e) = container.start().await {
                println!("Failed to start P2PandaContainer: {:?}", e);
            }
        } else {
            println!("P2PandaContainer state not found.");
        }
    }
}
