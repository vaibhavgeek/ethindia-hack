import { Box, Container, Heading, Text } from "@chakra-ui/react"
import Link from "next/link"
import Layout from "../../components/Layout"


const MatchHistoryPage = () => {
    return(
      <div>
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
        <Box mt={4}>
          <Layout />
        </Box>
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
      </div>
    )
}

export default MatchHistoryPage