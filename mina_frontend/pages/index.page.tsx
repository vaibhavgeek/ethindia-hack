import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import type { Add } from "../../contracts/src/";
import { Mina, isReady, PublicKey, fetchAccount } from "snarkyjs";
import {
  Box,
  Button,
  Container,
  Heading,
  Highlight,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import Layout from "../components/Layout";

export default function Home() {
  useEffect(() => {
    (async () => {
      await isReady;
      const { Add } = await import("../../contracts/build/src/");

      // Update this to use the address (public key) for your zkApp account
      // To try it out, you can try this address for an example "Add" smart contract that we've deployed to
      // Berkeley Testnet B62qisn669bZqsh8yMWkNyCA7RvjrL6gfdr3TQxymDHNhTc97xE5kNV
      const zkAppAddress =
        "B62qisn669bZqsh8yMWkNyCA7RvjrL6gfdr3TQxymDHNhTc97xE5kNV";
      // This should be removed once the zkAppAddress is updated.
      if (!zkAppAddress) {
        console.error(
          'The following error is caused because the zkAppAddress has an empty string as the public key. Update the zkAppAddress with the public key for your zkApp account, or try this address for an example "Add" smart contract that we deployed to Berkeley Testnet: B62qqkb7hD1We6gEfrcqosKt9C398VLp1WXeTo1i9boPoqF7B1LxHg4'
        );
      }

      const zkApp = new Add(PublicKey.fromBase58(zkAppAddress));
    })();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Kleio | Supercharged browsing history</title>
        <meta name="description" content="Supercharging browsing history" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW={"3xl"} mt={4}>
        <Link href="/">
          <Heading size={"xl"} cursor={"pointer"}>
            Kl
            <Text as={"span"} color={"teal.500"}>
              ei
            </Text>
            o
          </Heading>
        </Link>

        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            //fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Get more from <br />
            <Text as={"span"} color={"teal.500"}>
              your browsing history
            </Text>
          </Heading>

          <Text fontSize={20}>
            <b>Monetize</b> your browsing history with customized ads and{" "}
            <b>find new friends and groups</b>{" "}
            <Highlight
              query="without sacrificing privacy."
              styles={{
                px: "2",
                py: "1",
                rounded: "full",
                bg: "teal.100",
                fontWeight: "bold",
              }}
            >
              without sacrificing privacy.
            </Highlight>
          </Text>

          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Link href="/sync-history">
              <Button colorScheme={"teal"} rounded={"full"} px={6} size="lg">
                Make the most of your history
              </Button>
            </Link>
            <Link href="#">
              <Button variant={"link"} colorScheme={"blue"} size={"md"}>
                Are you an interested advertiser or community/DAO?
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Container>

      <Box bgColor={"teal.500"} py={10} position="fixed" bottom={0} w={"100%"}>
        <Container color="white" textAlign={"center"}>
          Built with no sleep by{" "}
          <a href="https://twitter.com/recurshawn">
            <span style={{ fontWeight: "bold", textDecoration: "underline" }}>
              @recurshawn
            </span>
          </a>{" "}
          &{" "}
          <a href="https://twitter.com/vaibhavgeek">
            <span style={{ fontWeight: "bold", textDecoration: "underline" }}>
              @vaibhavgeek
            </span>
          </a>
        </Container>{" "}
      </Box>
    </Layout>
  );
}
