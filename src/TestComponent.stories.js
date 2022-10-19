import { TestComponent } from "./TestComponent";

export default {
  title: "Design System/TestComponent",
  component: TestComponent,
  argTypes: {
    test: "testComponentProps",
    testBoolean: false,
    onClick() {},
  },
};

const Template = (args) => <TestComponent {...args} />;

export const TestComponents = () => {
  return (
    <div>
      <TestComponent
        test="test"
        testBoolean
        onClick={() => {
          console.log("test");
        }}
      />
      <TestComponent test="test1" />
    </div>
  );
};

export const TestComponentsProps = Template.bind({});
TestComponentsProps.args = {
  test: "testComponentProps",
  testBoolean: false,
  onClick() {},
};
