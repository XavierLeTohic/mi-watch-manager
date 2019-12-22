import { useEffect, useState } from "react";

import "./index.css";

const DeviceApplist = ({ device }) => {
  const [packages, setPackages] = useState(null);

  console.log(device);

  useEffect(async () => {
    const pkgs = await global.adbClient.getPackages(device["ro.serialno"]);
    setPackages(pkgs);
    console.log(pkgs);
  }, []);

  return (
    <div>
      <h3 className="apps-title">Apps</h3>
      <div className="drop-zone">
        Drag and drop an .apk file here to install it on your watch. Make you
        sure the application is for Wear OS and compatible with your Watch's
        version
      </div>
      {!packages && <div>Retrieving apps...</div>}
      {packages && (
        <ul className="package-list">
          {packages.map(packageName => (
            <li key={packageName}>{packageName}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeviceApplist;
