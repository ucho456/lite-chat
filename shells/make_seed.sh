docker exec firebase-emulator mkdir dump

docker exec firebase-emulator firebase emulators:export dump

cp -R -f ./docker/firebase/src/dump/* ./seed/

docker exec firebase-emulator rm -rf dump
