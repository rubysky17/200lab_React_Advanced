import { FC, PureComponent } from "react";

// * Cơ bản memo hoạt động dựa trên pureComponent đặc biệt là componentShouldUpdate()
const memo = <T extends {}>(
  Component: FC<T>,
  func: (prev: any, next: any) => boolean
) => {
  return class MemoizationComponent extends PureComponent<T> {
    shouldComponentUpdate(nextProps: Readonly<T>): boolean {
      if (typeof func === "function") {
        return func(this.props, nextProps);
      }
      return true;
    }

    render() {
      return <Component {...this.props} />;
    }
  };
};

export default memo;
