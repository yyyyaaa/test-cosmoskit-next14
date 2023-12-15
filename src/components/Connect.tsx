"use client";

import * as React from "react";
import { useChain, useWallet } from "@cosmos-kit/react";
import { PaperPlaneIcon, ResetIcon } from "@radix-ui/react-icons";
import { Box, Stack, Text, Button, useTheme } from "@interchain-ui/react";
import { Badge } from "./Badge";

const chainNames_1 = ["cosmoshub"];

export interface ConnectProps {
  children?: React.ReactNode;
}

export const Connect = (props: ConnectProps) => {
  const { theme, themeClass, setTheme } = useTheme();

  const { username, connect, disconnect, wallet, openView } = useChain(
    chainNames_1[0]
  );
  const { status: globalStatus, mainWallet } = useWallet(); // status here is the global wallet status for all activated chains (chain is activated when call useChain)

  React.useEffect(() => {
    const initConnection = async () => {
      await mainWallet?.connect();
    };

    initConnection();
  }, []);

  const connectionButton = React.useMemo(() => {
    const handleDisconnect = async () => {
      await disconnect();
    };

    if (globalStatus === "Connecting") {
      return (
        <Button onClick={() => connect()}>
          <PaperPlaneIcon className="mr-2 h-4 w-4" />
          {`Connecting ${wallet?.prettyName}`}
        </Button>
      );
    }
    if (globalStatus === "Connected") {
      return (
        <Stack
          direction="horizontal"
          space="$4"
          attributes={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button variant="unstyled" size="sm" onClick={() => openView()}>
            <div className="flex justify-center items-center space-x-2">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-green-500 leading-4 mb-2" />
              <span>Connected to: {wallet?.prettyName}</span>
            </div>
          </Button>

          <Badge className="flex" variant="outline">
            <Text>Account name: {username}</Text>
          </Badge>

          <Button intent="danger" size="sm" onClick={handleDisconnect}>
            <ResetIcon className="mr-2 h-4 w-4" />
            Disconnect
          </Button>
        </Stack>
      );
    }

    return <Button onClick={() => connect()}>Connect Wallet</Button>;
  }, [
    connect,
    disconnect,
    globalStatus,
    openView,
    username,
    wallet?.prettyName,
  ]);

  return (
    <Box
      bg="$cardBg"
      py="$10"
      px="$10"
      borderColor="$divider"
      borderWidth="1px"
      borderStyle="solid"
      borderRadius="$md"
      boxShadow="$sm"
      minWidth="400px"
      textAlign="center"
    >
      <Stack direction="vertical" space="$4">
        <Text fontSize="$lg" fontWeight="$semibold" color="$text">
          Connect to a wallet
        </Text>

        <Box display="flex" justifyContent="center" pt="$10">
          {connectionButton}
        </Box>
      </Stack>
    </Box>
  );
};
