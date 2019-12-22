import "./index.css";

export default ({ device }) => {
  return (
    <div>
      <h3 className="device-model">{device["ro.product.model"]}</h3>
      <div className="device-brand">From {device["ro.product.brand"]}</div>
      <div className="device-spec">CPU: {device["ro.product.cpu.abi"]}</div>
      <div className="device-spec">
        Build version: {device["ro.build.version.release"]}
      </div>
      <div className="device-spec">
        SDK version: {device["ro.build.version.sdk"]}
      </div>
      <div className="device-spec">
        Security Patch: {device["ro.build.version.security_patch"]}
      </div>
    </div>
  );
};
