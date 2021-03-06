DELETE FROM PRICE_POINT;
DELETE FROM CURRENCY;
DELETE FROM PRODUCT;

INSERT INTO CURRENCY(ID,NAME,ISO3) VALUES (1, 'Dollar', 'USD');
INSERT INTO CURRENCY(ID,NAME,ISO3) VALUES (2, 'British Pound', 'GBP');
INSERT INTO CURRENCY(ID,NAME,ISO3) VALUES (3, 'Euro', 'EUR');

INSERT INTO PRODUCT(ID,NAME,DESCRIPTION) VALUES (1, 'dummy product', 'A dummy product for testing purposes.');
INSERT INTO PRODUCT(ID,NAME,DESCRIPTION) VALUES (2, 'second dummy product', 'A second dummy product for testing purposes.');
INSERT INTO PRODUCT(ID,NAME,DESCRIPTION) VALUES (3, 'third dummy product', 'A third dummy product for testing purposes.');

INSERT INTO PRICE_POINT(ID,PRICE,CURRENCY_ID,PRODUCT_ID) VALUES (1, 7.89, 3,1);
INSERT INTO PRICE_POINT(ID,PRICE,CURRENCY_ID,PRODUCT_ID) VALUES (2, 1.23, 1,1);
INSERT INTO PRICE_POINT(ID,PRICE,CURRENCY_ID,PRODUCT_ID) VALUES (3, 4.56, 2,1);
INSERT INTO PRICE_POINT(ID,PRICE,CURRENCY_ID,PRODUCT_ID) VALUES (4, 11.11, 1,2);