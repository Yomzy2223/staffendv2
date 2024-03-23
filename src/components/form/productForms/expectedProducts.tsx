import {
  IProduct,
  IProductFull,
  IService,
  IServiceFull,
} from "@/hooks/api/types";
import useServiceApi from "@/hooks/useServiceApi";
import { Button, Checkbox, Tabs } from "flowbite-react";
import React, { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import PopOverWrapper from "@/components/wrappers/popOverWrapper";
import { ChevronDown, X } from "lucide-react";
import useProductApi from "@/hooks/useProductApi";

const ExpectedProducts = ({
  setValue,
  errorMsg,
  defaultValue,
  edit,
}: {
  setValue: UseFormSetValue<[]>;
  errorMsg: string;
  defaultValue: string[];
  edit: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <PopOverWrapper open={open} setOpen={setOpen} content={<Content />} big>
        <Button size="fit" color="ghost">
          Select follow up products (sequencially)
          <ChevronDown />
        </Button>
      </PopOverWrapper>
    </div>
  );
};

export default ExpectedProducts;

const Content = ({ info = [] }: { info: IProductFull[] }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selected, setSelected] = useState<IProductFull[]>(info);

  const { useGetServiceProductsQuery } = useProductApi();
  const { getAllServicesQuery } = useServiceApi();
  const { data } = getAllServicesQuery;
  const servicesData: IServiceFull[] = data?.data?.data;

  const products = useGetServiceProductsQuery(
    servicesData?.[activeTab]?.id || ""
  );
  const productsData: IProductFull[] = products.data?.data?.data || [];

  const allServices = servicesData?.map((el: IService) => el?.name);
  //   const allProducts = productsData?.map((el: IProduct) => el.name);

  const onSelect = (el: IProductFull) => {
    let isPresent = !!selected.find((product) => product.name === el.name);
    let products = [...selected];
    if (isPresent) {
      products = products.filter((product) => product.name !== el.name); //deselect
    } else {
      products = el ? [...products, el] : [...products]; //select
    }
    products = [...new Set(products)]; //Remove duplicates
    setSelected(products);
  };

  const removeProduct = (product: IProductFull) => {
    let newSelected = [...selected].filter((el) => el.name !== product.name);
    setSelected(newSelected);
    // setValue("expectedProducts", newSelected);
  };

  return (
    <div>
      <div className="flex">
        <div>
          <Tabs
            aria-label="Full width tabs"
            style="fullWidth"
            onActiveTabChange={(tab) => setActiveTab(tab)}
          >
            {allServices?.map((service: string) => (
              <Tabs.Item key={service} title={service}>
                <Command>
                  <CommandInput placeholder="Search options..." />
                  <CommandGroup>
                    {productsData.map((el) => (
                      <CommandItem key={el.name}>
                        <Checkbox
                          id={el.id}
                          checked={
                            !!selected.find(
                              (product) => product.name === el.name
                            )
                          }
                          onChange={() => onSelect(el)}
                          color="primary"
                          className="w-4 h-4"
                        />
                        <label htmlFor={el.id} className="pl-2 flex-1">
                          {el.name}
                        </label>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </Tabs.Item>
            ))}
          </Tabs>
          {/* <ComboBoxComp
          name="expectedProducts"
          fieldName=""
          options={["NIN", "Proof of address"]}
          setValue={setValue}
          errorMsg={errorMsg}
          // errorMsg={errors["documentType"]?.message as string}
          // defaultValue={fieldInfo.documentType}
          defaultValue={defaultValue}
          disabled={!edit}
          optionsLoading={false}
        /> */}
        </div>
        {selected.length > 0 && (
          <div>
            <p>Selected Products</p>
            {selected?.map((el) => (
              <div key={el?.id} className="flex items-center gap-2">
                <span>{el?.name}</span>
                <X size={16} onClick={() => removeProduct(el)} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="sticky bottom-0 bg-white p-3 pt-0">
        <Button
          //   disabled={!selected.field}
          color="primary"
          //   onClick={() => onApply(selected)}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};
