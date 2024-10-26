import { Grid } from "react-loader-spinner";

export default function Loader() {
  return (
    <Grid
      visible={true}
      height="40"
      width="40"
      color="#32abf2"
      ariaLabel="grid-loading"
      radius="12.5"
      wrapperStyle={{
        width: "100%",
        height: "100%",
        minHeight: "100px",
      }}
    />
  );
}
