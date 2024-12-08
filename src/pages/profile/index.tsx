import { useCallback, useEffect, useState } from "react";
import { Button, MediumText, SmallText, TextInput, VStack } from "../../common";
import { useFetch, usePost } from "../../common/hooks";
import { CONSTANTS } from "../../constants";
import { AccountDto, AccountUpdateDto } from "../../api-interface/account";
import { ValidationUtil } from "../../common/utils/validation";
import styled from "styled-components";
import { error } from "console";
import { colors } from "../../common/styles";

export const Profile = () => {
  const [accountData, setAccountData] = useState<AccountUpdateDto>({
    name: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { data: account } = useFetch<AccountDto>({
    url: CONSTANTS.ENDPOINT.ACCOUNT,
    onSuccess: () => {
      setErrorMessage("");
    },
    onError: (err) => {
      setErrorMessage(err);
    },
    shouldFetch: true,
  });
  const { doPost: updateAccount } = usePost({
    url: CONSTANTS.ENDPOINT.ACCOUNT,
    method: "PUT",
    onSuccess: () => window.location.reload(),
    onError: (err) => setErrorMessage(err),
  });

  useEffect(() => {
    if (account) {
      setAccountData(account);
    }
  }, [account]);

  const onInputChange = useCallback(
    (value: string, key: keyof AccountUpdateDto) => {
      setAccountData((prev) => {
        return {
          ...prev,
          [key]: value,
        };
      });
    },
    []
  );

  return (
    <StyledWrapper gap={50} align="center" width="60%">
      <MediumText bold>Your Profile</MediumText>
      {errorMessage && (
        <SmallText color={colors.purple3}>{errorMessage}</SmallText>
      )}
      <VStack gap={20}>
        <TextInput
          title="Name"
          value={accountData?.name}
          onChange={(v) => onInputChange(v, "name")}
          validate={() => ValidationUtil.require(accountData.name)}
          required
        />
        <TextInput
          title="Email"
          value={accountData?.email}
          onChange={(v) => onInputChange(v, "email")}
          validate={() => ValidationUtil.require(accountData.email)}
          required
        />
        <TextInput
          title="Password"
          type="password"
          disabled
          value="***********"
        />
      </VStack>
      {accountData !== account && (
        <Button
          bold
          disabled={
            !ValidationUtil.require(accountData.name) ||
            !ValidationUtil.require(accountData.email)
          }
          width="25%"
          onClick={() => updateAccount(accountData)}
        >
          Save
        </Button>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled(VStack)`
  margin: auto;
  margin-top: 70px;
`;
