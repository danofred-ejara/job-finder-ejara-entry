import { Typography } from "antd";
import { FileSearchOutlined } from "@ant-design/icons";
import { Link } from "react-router";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Typography className="text-xl!">
        <Link to={"/"}>
          <FileSearchOutlined style={{ fontSize: "20px" }} />
          Job-Finder
        </Link>
      </Typography>
    </div>
  );
}
