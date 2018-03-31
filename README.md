#### It's for encrypting your messages

**CryptoBot uses CryptoJS on most of the encrytion methods. You can use this application to view these encrytion and decryption process without headache.**

#### for fun :)

![logo](logoban.png)

#### view this app from browser

```
yarn install
yarn start
```

#### view this app (electron)

```
yarn build // you need to modify the /build/index.html for the right <script src="">
electron .
```

#### package for darwin

```
electron-packager . --electron-version=1.8.4  --platform=darwin --icon=./logo.icns --arch=x64 --ignore=node_modules/ --appname=CryptoBot --overwrite
```

#### package for win32

```
electron-packager . --electron-version=1.8.4  --platform=win32 --arch=x64 --ignore=node_modules/ --appname=CryptoBot --overwrite
```

#### package for linux

```
electron-packager . --electron-version=1.8.4  --platform=linux --arch=x64 --ignore=node_modules/ --appname=CryptoBot --overwrite
```

there may be some issues with the performance on win

**Thanks for the new icon by Arslanshn**
