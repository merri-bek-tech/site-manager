-- Add migration script here
CREATE TABLE regions (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE sites (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    region_id VARCHAR(36) ,
    name VARCHAR(255) NOT NULL,
    FOREIGN KEY (region_id) REFERENCES regions(id)
);

CREATE TABLE site_configs (
    id INT PRIMARY KEY NOT NULL,
    this_site_id VARCHAR(36),
    FOREIGN KEY (this_site_id) REFERENCES sites(id)
);