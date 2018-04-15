#!/bin/sh

mongo takeitover --eval "db.dropDatabase()"
mongoimport --host db --headerline -d takeitover -c maps --type csv --file ./csv/map.csv
mongoimport --host db --headerline -d takeitover -c users --type csv --file ./csv/user.csv
mongoimport --host db --headerline -d takeitover -c countries --type csv --file ./csv/country.csv
mongoimport --host db --headerline -d takeitover -c qrcodes --type csv --file ./csv/qrcode.csv
mongoimport --host db --headerline -d takeitover -c settings --type csv --file ./csv/setting.csv
mongoimport --host db --headerline -d takeitover -c feedbacks --type csv --file ./csv/feedback.csv
mongoimport --host db --headerline -d takeitover -c questions --type csv --file ./csv/question.csv
