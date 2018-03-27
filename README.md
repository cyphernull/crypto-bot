#### for fun :)

![logo](logo-readme.png)

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
