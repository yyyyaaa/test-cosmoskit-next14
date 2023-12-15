"use client";

import cls from "clsx";
import { ChainProvider } from "@cosmos-kit/react";
import { wallets as keplrWallets } from "@cosmos-kit/keplr";
import { wallets as leapWallets } from "@cosmos-kit/leap";
import { assets, chains } from "chain-registry";
import { Chain } from "@chain-registry/types";
import { Decimal } from "@cosmjs/math";
import { GasPrice } from "@cosmjs/stargate";
import {
  Box,
  Stack,
  Text,
  IconButton,
  ThemeProvider,
  Select,
  SelectOption,
  useTheme,
} from "@interchain-ui/react";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, themeClass, setTheme } = useTheme();

  // Usually we need to wrap this with <ThemeProvider /> of @interchain-ui/react, but cosmos-kit/react already wraps it for us
  // It's ok to double wrap it tho (for nested themes), but it's not necessary
  return (
    <ChainProvider
      chains={chains}
      assetLists={[...assets]}
      wallets={[...keplrWallets, ...leapWallets]}
      throwErrors={false}
      subscribeConnectEvents={false}
      defaultNameService={"stargaze"}
      walletConnectOptions={{
        signClient: {
          projectId: "a8510432ebb71e6948cfd6cde54b70f7",
          relayUrl: "wss://relay.walletconnect.org",
          metadata: {
            name: "CosmosKit Example",
            description: "CosmosKit test dapp",
            url: "https://test.cosmoskit.com/",
            icons: [
              "https://raw.githubusercontent.com/cosmology-tech/cosmos-kit/main/packages/docs/public/favicon-96x96.png",
            ],
          },
        },
      }}
      signerOptions={{
        signingStargate: (chain: Chain) => {
          switch (chain.chain_name) {
            case "osmosis":
              return {
                gasPrice: new GasPrice(Decimal.zero(1), "uosmo"),
              };
            default:
              return void 0;
          }
        },
      }}
      logLevel={"DEBUG"}
      endpointOptions={{
        isLazy: true,
        endpoints: {
          cosmoshub: {
            rpc: [
              {
                url: "https://rpc.cosmos.directory/cosmoshub",
                headers: {},
              },
            ],
          },
        },
      }}
      disableIframe={false}
    >
      <div id="my-connect" className={cls("app", themeClass)}>
        <Box
          backgroundColor={theme == "dark" ? "$gray700" : "$white"}
          px="$10"
          py="$16"
          minHeight="700px"
          position="relative"
        >
          {children}
          <Box position="absolute" top="$4" right="$6">
            <Stack
              direction="horizontal"
              space="$4"
              attributes={{
                p: "$2",
                alignItems: "center",
              }}
            >
              <IconButton
                variant="ghost"
                intent="secondary"
                size="sm"
                icon={theme === "dark" ? "sunLine" : "moonLine"}
                onClick={() => {
                  if (theme === "light") {
                    return setTheme("dark");
                  }
                  return setTheme("light");
                }}
              />
            </Stack>
          </Box>
        </Box>
      </div>
    </ChainProvider>
  );
};
