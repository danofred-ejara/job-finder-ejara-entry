import React, { useState, useRef, useCallback } from "react";
import {
  Button,
  Form,
  Input,
  Upload,
  Select,
  message,
  Avatar,
  type UploadFile,
  DatePicker,
} from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import type { RcFile } from "antd/es/upload/interface";
import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
} from "@tanstack/react-query";
import { getCountries, type Country } from "~/lib/countries";
import type { User } from "~/types";
import { profileService } from "~/services/profile.service";

type Props = {
  setPageAlert?: (a: { type: "success" | "warning"; message: string }) => void;
  user: User;
};

export function AccountSettings({ setPageAlert, user }: Props) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [preview, setPreview] = useState<string | null>(user.imageUrl ?? null);
  const [countryValue, setCountryValue] = useState<string | undefined>(
    undefined,
  );
  const [search, setSearch] = useState<string | undefined>(undefined);
  const debounceRef = useRef<number | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["profiles"],
    mutationFn: async ({ role, country, years, email, fullName }: any) => {
      const newCountry = country.split(";");
      const data = {
        role,
        email,
        fullName,
        experiencedSince: new Date(years.toISOString()),
        country: { name: newCountry[1], code: newCountry[0] },
      };

      await profileService.update(user.uid, data);
    },
  });

  const countriesQuery = useInfiniteQuery({
    queryKey: ["countries", search],
    queryFn: ({ pageParam = 0 }) =>
      getCountries({ q: search, limit: 100, offset: pageParam }),
    getNextPageParam: (last) =>
      last.meta.more ? last.meta.offset + last.meta.limit : undefined,
    initialPageParam: 0,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

  const allCountries = (countriesQuery.data?.pages ?? []).flatMap(
    (p) => p.data,
  ) as Country[];

  function beforeUpload(file: RcFile) {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Only image files are allowed.");
      return Upload.LIST_IGNORE;
    }

    const reader = new FileReader();
    reader.onload = (e) => setPreview(String(e.target?.result ?? ""));
    reader.readAsDataURL(file);

    setFileList([file as UploadFile]);
    // prevent auto upload
    return Upload.LIST_IGNORE;
  }

  const onFinish = async (values: any) => {
    await mutateAsync(values, {
      onSuccess: () => {
        message.success("Profile updated successfully");
        setPageAlert?.({
          type: "success",
          message: "Profile updated successfully",
        });
      },
    });
  };

  const handleSearch = useCallback((value: string) => {
    setSearch((prev) => {
      if (prev === value) return prev;

      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => {
        setSearch(value);
      }, 250);
      return prev;
    });
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const distance =
      target.scrollHeight - target.scrollTop - target.clientHeight;
    if (
      distance < 50 &&
      countriesQuery.hasNextPage &&
      !countriesQuery.isFetchingNextPage
    ) {
      countriesQuery.fetchNextPage();
    }
  };

  return (
    <div className="p-4">
      <div>
        <div className="flex gap-6">
          <div className="w-48 hrink-0">
            <div className="flex flex-col gap-4 justify-center items-center">
              <Avatar
                size={100}
                src={preview ?? undefined}
                icon={!preview ? <UserOutlined /> : undefined}
              />
              <Upload
                beforeUpload={beforeUpload}
                fileList={fileList}
                listType="picture"
              >
                <Button icon={<UploadOutlined />}>Update photo</Button>
              </Upload>
            </div>
          </div>

          <div className="flex-1 max-w-2/5">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                role: user.profile?.role,
                experiencedSince: user.profile?.experiencedSince,
                fullName: user.profile?.fullName,
                email: user.email,
              }}
            >
              <Form.Item name="email" label="Email" rules={[{}]}>
                <Input placeholder="your@domain" disabled />
              </Form.Item>

              <Form.Item
                name="fullName"
                label="Full name"
                rules={[
                  { required: true, message: "Please enter your full name" },
                ]}
              >
                <Input placeholder="John Doe" />
              </Form.Item>

              <Form.Item
                name="role"
                label="Current role"
                rules={[
                  { required: true, message: "Please specify your role" },
                ]}
              >
                <Input placeholder="e.g. Frontend Developer" />
              </Form.Item>

              <Form.Item name="country" label="Country">
                <Select
                  showSearch={{ onSearch: handleSearch, filterOption: false }}
                  placeholder="Search country"
                  onPopupScroll={handleScroll}
                  notFoundContent={
                    countriesQuery.isFetching ? "Loading..." : null
                  }
                  options={allCountries.map((c) => ({
                    label: `${c.emoji} ${c.name}`,
                    value: `${c.code};${c.name}`,
                  }))}
                  onChange={(val) => {
                    setCountryValue(val);
                    form.setFieldsValue({ country: val });
                  }}
                  value={countryValue}
                  allowClear
                  virtual={false}
                />
              </Form.Item>

              <Form.Item
                name="years"
                label="Years of experience in this role"
                rules={[{ required: true, message: "Please choose a year" }]}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item>
                <div className="flex gap-3">
                  <Button type="primary" htmlType="submit" loading={isPending}>
                    Save profile
                  </Button>
                  <Button
                    onClick={() => {
                      form.resetFields();
                      setFileList([]);
                      setPreview(null);
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
