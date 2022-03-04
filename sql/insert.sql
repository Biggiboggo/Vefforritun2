INSERT INTO events (id, name, slug, description) VALUES (1, 'Forritarahittingur í febrúar', 'forritarahittingur-i-februar', 'Forritarar hittast í febrúar og forrita saman eitthvað frábært.');
INSERT INTO events (id, name, slug, description) VALUES (2, 'Hönnuðahittingur í mars', 'honnudahittingur-i-mars', 'Spennandi hittingur hönnuða í Hönnunarmars.');
INSERT INTO events (id, name, slug, description) VALUES (3, 'Verkefnastjórahittingur í apríl', 'verkefnastjorahittingur-i-april', 'Virkilega vel verkefnastýrður hittingur.');

INSERT INTO registrations (name, comment, event) VALUES ('Forvitinn forritari', 'Hlakka til að forrita með ykkur', 1);
INSERT INTO registrations (name, comment, event) VALUES ('Jón Jónsson', null, 2);
INSERT INTO registrations (name, comment, event) VALUES ('Guðrún Guðrúnar', 'verður vefforritað?', 3);

INSERT INTO users (name, username, password, admin) VALUES ('admin', 'admin', '$2a$11$pgj3.zySyFOvIQEpD7W6Aund1Tw.BFarXxgLJxLbrzIv/4Nteisii', '1');
INSERT INTO users (name, username, password, admin) VALUES ('Birgir', 'biggi', '$2b$11$/cSlWTYQAg/dZ.dl7v4F2eLbX0qNqeyq2Z/mOny8gzfv9Qlg8s0Te', '0');
