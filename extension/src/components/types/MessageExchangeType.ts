import type { TPolicyAction } from "../helpers/PolicyHelper"

export type TMessageExchange={
    displayMode: TPolicyAction["action"],
    title:string,
    description:string
}
