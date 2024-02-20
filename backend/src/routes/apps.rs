use docker_sync::Docker;
use rocket::serde::json::Json;
use rocket::serde::{Deserialize, Serialize};
use rocket::Route;

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
struct AppList {
    foo: String,
}

// A type which either has an AppList or an error
type AppListResult = Result<AppList, String>;

#[get("/installed", format = "json")]
fn installed_apps() -> Json<AppListResult> {
    match Docker::connect() {
        // we consider the local Docker socket by default, with the default path (/var/run/docker.sock), no need to precise the path
        Ok(docker) => Json(Ok(AppList {
            foo: "bar".to_string(),
        })),
        Err(e) => Json(Err("no_docker".to_string())),
    }
}

pub fn routes() -> Vec<Route> {
    routes![installed_apps]
}
