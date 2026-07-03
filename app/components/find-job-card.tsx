import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Input, Typography } from "antd";

export type FindJobCardProps = {
  value?: string;
  onSearch?: (value: string) => void;
  loading?: boolean;
};

export default function FindJobCard({
  value,
  onSearch,
  loading,
}: FindJobCardProps) {
  return (
    <Card className="bg-blue-500! px-3! rounded-2xl! overflow-hidden">
      <div
        style={{ zIndex: 1, backgroundColor: "transparent" }}
        className="relative"
      >
        <h2 className="text-white text-2xl mb-2">Find your dream job here!</h2>
        <p className="text-base text-gray-200 mb-5">
          Looking for jobs? Browse our latest job openings to view and apply to
          the best jobs today!
        </p>

        <div className="flex p-1 rounded-lg bg-white">
          <Input
            value={value}
            onChange={(event) => onSearch?.(event.target.value)}
            placeholder="Search job ..."
            variant="borderless"
            prefix={
              <SearchOutlined
                className="text-gray-400!"
                style={{ fontSize: "18px" }}
              />
            }
            className="text-md! border-none!"
            disabled={loading}
          />
          <Button
            type="primary"
            size="large"
            disabled={loading}
            onClick={() => onSearch?.(value ?? "")}
          >
            Search
          </Button>
        </div>
      </div>
      <div
        className="absolute bg-linear-to-r from-[#e7e7e7] via-[#f0f0f0] h-[40px] w-[200px] opacity-30 border border-white rotate-x-12 -rotate-y-45 -right-10"
        style={{
          top: 40,
          zIndex: 0,
        }}
      />
    </Card>
  );
}
