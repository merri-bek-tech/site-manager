use rocket::Route;
use rocket::serde::json::Json;
use rocket::serde::{Serialize, Deserialize};

#[get("/status")]
fn hello() -> String {
    "panda status".to_string()
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
struct Person {
  name: String,
  age: u8,
}

#[get("/frodo", format = "json")]
fn frodo() -> Json<Person> {
    Json(Person {
        name: "Frodo Baggins".to_string(),
        age: 50,
    })
}

pub fn routes() -> Vec<Route> {
    routes![hello, frodo]
}