use anyhow::Result;
use gethostname::gethostname;
use p2panda_core::Hash;
use p2panda_discovery::mdns::LocalDiscovery;
use p2panda_net::{FromNetwork, Network, NetworkBuilder, NetworkId, TopicId};
use p2panda_sync::TopicQuery;
use rocket::tokio;
use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};

use crate::panda_comms::messages::Message;
use crate::panda_comms::site_messages::SiteMessages;
use crate::panda_comms::sites::Sites;

#[derive(Clone, Debug, PartialEq, Eq, Hash, Deserialize, Serialize)]
pub struct ChatTopic(String, [u8; 32]);

impl ChatTopic {
    pub fn new(name: &str) -> Self {
        Self(name.to_owned(), *Hash::new(name).as_bytes())
    }
}

impl TopicQuery for ChatTopic {}

impl TopicId for ChatTopic {
    fn id(&self) -> [u8; 32] {
        self.1
    }
}

#[derive(Default)]
pub struct P2PandaContainer {
    pub network: Arc<Mutex<Option<Network<ChatTopic>>>>,
}

impl P2PandaContainer {
    pub async fn start(&self) -> Result<()> {
        let mut sites = Sites::build();

        println!("P2Panda: starting up");

        let site_name = get_site_name();
        println!("Starting client for site: {}", site_name);

        let network_slug = "merri-bek.tech";
        let network_id: NetworkId = Hash::new(network_slug).into();

        let topic = ChatTopic::new("site_management");

        // let private_key = PrivateKey::new();

        let network: Network<ChatTopic> = NetworkBuilder::new(network_id)
            .discovery(LocalDiscovery::new()?)
            .build()
            .await?;

        let (tx, mut rx, ready) = network.subscribe(topic).await?;

        tokio::task::spawn(async move {
            while let Some(event) = rx.recv().await {
                handle_gossip_event(event, &mut sites);
            }
        });

        // put the network in the container
        let mut network_lock = self.network.lock().unwrap();
        *network_lock = Some(network);

        Ok(())
    }
}

fn get_site_name() -> String {
    gethostname().to_string_lossy().to_string()
}

fn handle_gossip_event(event: FromNetwork, sites: &mut Sites) {
    match event {
        FromNetwork::GossipMessage { bytes, .. } => match Message::decode_and_verify(&bytes) {
            Ok(message) => {
                handle_message(message, sites);
            }
            Err(err) => {
                eprintln!("Invalid gossip message: {}", err);
            }
        },
        _ => panic!("no sync messages expected"),
    }
}

fn handle_message(message: Message<SiteMessages>, sites: &mut Sites) {
    match message.payload {
        SiteMessages::SiteRegistration(registration) => {
            println!("Received SiteRegistration: {:?}", registration);
            sites.register(registration.name);
            sites.log();
        }
        SiteMessages::SiteNotification(notification) => {
            println!("Received SiteNotification: {:?}", notification);
        }
    }
}
