import { DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Space,
  Typography,
} from "antd";

type LabelValueOptions = Array<{
  label: string;
  value: string;
}>;

export type Filter = {
  label: string;
  name: string;
  type: "checkbox" | "radio";
  options?: LabelValueOptions;
  placeholder?: string;
};

export type JobSearchFilterCardProps = {
  filters: Filter[];
  initialValues?: Record<string, any>;
  onChange?: (v: any) => void;
};

export function JobSearchFiltersCard({
  filters,
  initialValues,
  onChange,
}: JobSearchFilterCardProps) {
  const [form] = Form.useForm();

  return (
    <Card
      className="bg-white!"
      title="Filters"
      extra={
        <Button variant="text" type="text">
          <DeleteOutlined />
        </Button>
      }
      styles={{ body: { paddingLeft: 15, paddingRight: 15 } }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onValuesChange={(v) => {
          onChange?.(v);
        }}
      >
        {filters.map((filter, index) => {
          const renderContent = () => {
            const type = filter.type;
            switch (type) {
              case "radio":
              case "checkbox":
                const Group =
                  type === "checkbox" ? Checkbox.Group : Radio.Group;
                const Item = type === "checkbox" ? Checkbox : Radio;
                return (
                  <Group>
                    <Row gutter={[16, 16]}>
                      {(filter.options ?? []).map((option, index) => (
                        <Col span={12} key={index}>
                          <Item value={option.value} name={filter.name}>
                            {option.label}
                          </Item>
                        </Col>
                      ))}
                    </Row>
                  </Group>
                );
              default:
                return null;
            }
          };

          return (
            <div key={index}>
              <Form.Item name={filter.name} label={filter.label}>
                {renderContent()}
              </Form.Item>
            </div>
          );
        })}
      </Form>
    </Card>
  );
}
