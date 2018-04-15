mongo takeitover --eval "db.dropDatabase()"
mongoimport --headerline -d takeitover -c maps --type csv --file ./TakeOver/doc/csv/map.csv
mongoimport --headerline -d takeitover -c users --type csv --file ./TakeOver/doc/csv/user.csv
mongoimport --headerline -d takeitover -c countries --type csv --file ./TakeOver/doc/csv/country.csv
mongoimport --headerline -d takeitover -c qrcodes --type csv --file ./TakeOver/doc/csv/qrcode.csv
mongoimport --headerline -d takeitover -c settings --type csv --file ./TakeOver/doc/csv/setting.csv
mongoimport --headerline -d takeitover -c feedbacks --type csv --file ./TakeOver/doc/csv/feedback.csv
mongoimport --headerline -d takeitover -c questions --type csv --file ./TakeOver/doc/csv/question.csv