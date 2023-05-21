import React, { FC, useEffect, useMemo, useRef } from "react";

const Suspender = () => {
  const refResolve = useRef<() => void>();

  const promise = useMemo(
    () =>
      new Promise<void>((resolve) => {
        refResolve.current = resolve;
      }),
    []
  );

  useEffect(() => {
    return () => {
      refResolve.current?.();
    };
  });

  throw promise;
};

const lazy = (
  getPromise: () => Promise<{
    default: FC;
  }>
) => {
  const promise = getPromise();

  return class LaziedComponent extends React.Component {
    state: {
      Coupo: FC | undefined;
    } = {
      Coupo: undefined,
    };

    componentDidMount() {
      promise.then((Com: any) => {
        this.setState({
          Coupo: Com.default,
        });
      });
    }

    render(): React.ReactNode {
      const { Coupo } = this.state;

      if (!Coupo) {
        return <Suspender />;
      }

      return <Coupo />;
    }
  };
};

export default lazy;
