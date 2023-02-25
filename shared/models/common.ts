import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { CrudType, Utils } from "shared/enum";

export interface LayoutProps {
  children: ReactNode
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: (page: LayoutProps) => ReactElement
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export interface AlertModel {
  title: Utils,
  icon?: string,
  arrayMessage?: string[],
  message: string,
  mode: CrudType,
  textBtnSuccess?: string,
  textBtnError?: string,
  role?: number,
  data?: any
}
