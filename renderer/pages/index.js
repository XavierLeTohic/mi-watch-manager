import { Component, useState, useEffect } from 'react'

import './index.css'

const Index = () => {

    const [devices, setDevices] = useState([]);
    const [loadingDevices, setLoadingDevices] = useState(true)
    const [loadingDevicesError, setLoadingDevicesError] = useState(null);
    let scanInterval;

    const scanDevices = () => {
        global.adbClient.listDevices()
            .then(async (availableDevices) => {
                if(availableDevices.length) {
                    const devices = await Promise.all(availableDevices.map(({ id }) => global.adbClient.getProperties(id)))
                    console.log(devices)
                    clearInterval(scanInterval);
                    setDevices(devices);
                    setLoadingDevices(false)
                }
            })
            .catch(function(err) {
                console.error('Something went wrong:', err.stack)
                setLoadingDevices(false);
                clearInterval(scanInterval)
            })
    }

    useEffect(() => {
        scanDevices();
        scanInterval = setInterval(scanDevices, 500);
    }, [])

    return  (
        <div className="page">
          {loadingDevices && (
              <div className="container">
                  <h1>Looking for devices...</h1>
                  <p>Plug your Xiaomi Mi Watch to this computer using the charger.</p>
              </div>
          )}
          {!loadingDevices && loadingDevicesError && (
              <div className="container error">
                    <div className="error-label">
                        Could not find any devices, make you sure you have installed ADB tools on this computer or enabled ADB debugging from the developer options on the Mi Watch
                    </div>
                    <button onClick={scanDevices}>Retry</button>
              </div>
          )}
          {!loadingDevices && devices.length && (
             <div className="container">
                <h1>Select a device</h1>
                <ul className="devices-list">
                    {devices.map(device => (
                        <li key={device.DEVICE_PROVISIONED}>
                            <div className="product-model">{device['ro.product.model']}</div>
                            <div className="product-brand">From {device['ro.product.brand']}</div>
                        </li>
                    ))}
                </ul>
             </div>
          )}
        </div>
      )
}

export default Index;