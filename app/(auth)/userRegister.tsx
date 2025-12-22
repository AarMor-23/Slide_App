import { Link, Stack, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

const COLORS = {
  primary: "#73ffad",
  bg: "#151515",
  text: "#f5f5f5",
  muted: "#a8a8a8",
  border: "rgba(255,255,255,0.12)",
  card: "rgba(255,255,255,0.04)",
};

export default function UserRegister() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [agree, setAgree] = useState(true);
  const [loading, setLoading] = useState(false);

  const passwordsMatch = password.length > 0 && password === confirm;

  const canSubmit = useMemo(() => {
    const e = email.trim();
    return (
      fullName.trim().length >= 2 &&
      e.length > 3 &&
      e.includes("@") &&
      password.length >= 6 &&
      confirm.length >= 6 &&
      passwordsMatch &&
      agree &&
      !loading
    );
  }, [fullName, email, password, confirm, passwordsMatch, agree, loading]);

  const onRegister = async () => {
    if (!canSubmit) return;

    setLoading(true);
    try {
      // TODO: replace with your auth call
      await new Promise((r) => setTimeout(r, 700));

      Alert.alert("Account created", "You can sign in now.");
      router.replace("/(auth)/userLogin");
    } catch (e) {
      Alert.alert("Sign up failed", "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      {/* Extra safety: ensure no header for this screen */}
      <Stack.Screen options={{ headerShown: false }} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 28 }}>
            {/* Top */}
            <View style={{ gap: 10 }}>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "800",
                  color: COLORS.text,
                  letterSpacing: -0.4,
                }}
              >
                Create your account
              </Text>
              <Text style={{ fontSize: 14, color: COLORS.muted, lineHeight: 20 }}>
                Sign up in under a minute. You can tweak details later.
              </Text>
            </View>

            {/* Form */}
            <View style={{ marginTop: 26, gap: 14 }}>
              <FieldLabel label="Full name" />
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Dev Kharvari"
                placeholderTextColor="rgba(245,245,245,0.35)"
                autoCapitalize="words"
                style={styles.input}
              />

              <FieldLabel label="Email" />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor="rgba(245,245,245,0.35)"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />

              <FieldLabel label="Password" />
              <View style={styles.passwordWrap}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="At least 6 characters"
                  placeholderTextColor="rgba(245,245,245,0.35)"
                  secureTextEntry={!showPw}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={[
                    styles.inputInner,
                    { borderWidth: 0, marginTop: 0, flex: 1 },
                  ]}
                />
                <Pressable
                  onPress={() => setShowPw((s) => !s)}
                  hitSlop={10}
                  style={({ pressed }) => [
                    styles.pwBtn,
                    pressed && { opacity: 0.75 },
                  ]}
                >
                  <Text style={{ color: COLORS.text, fontWeight: "700" }}>
                    {showPw ? "Hide" : "Show"}
                  </Text>
                </Pressable>
              </View>

              <FieldLabel label="Confirm password" />
              <TextInput
                value={confirm}
                onChangeText={setConfirm}
                placeholder="Re-enter password"
                placeholderTextColor="rgba(245,245,245,0.35)"
                secureTextEntry={!showPw}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />

              {/* Helper line */}
              <View style={{ marginTop: 2 }}>
                {confirm.length > 0 && !passwordsMatch ? (
                  <Text style={{ color: "rgba(255,120,120,0.95)", fontSize: 12 }}>
                    Passwords don’t match
                  </Text>
                ) : (
                  <Text style={{ color: "rgba(245,245,245,0.45)", fontSize: 12 }}>
                    Use 6+ characters. Mix letters + numbers if you want.
                  </Text>
                )}
              </View>

              {/* Agree row */}
              <Pressable
                onPress={() => setAgree((a) => !a)}
                style={({ pressed }) => [
                  { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 8 },
                  pressed && { opacity: 0.75 },
                ]}
              >
                <View style={[styles.checkbox, agree && styles.checkboxOn]}>
                  {agree ? <View style={styles.checkboxDot} /> : null}
                </View>
                <Text style={{ color: COLORS.muted, fontSize: 13, lineHeight: 18 }}>
                  I agree to the{" "}
                  <Text style={{ color: COLORS.text, fontWeight: "700" }}>Terms</Text>{" "}
                  and{" "}
                  <Text style={{ color: COLORS.text, fontWeight: "700" }}>Privacy Policy</Text>
                </Text>
              </Pressable>

              {/* Create account button */}
              <Pressable
                onPress={onRegister}
                disabled={!canSubmit}
                style={({ pressed }) => [
                  styles.primaryBtn,
                  !canSubmit && { opacity: 0.45 },
                  pressed && canSubmit && { transform: [{ scale: 0.99 }] },
                ]}
              >
                <Text style={styles.primaryBtnText}>
                  {loading ? "Creating account…" : "Create account"}
                </Text>
              </Pressable>

              {/* Sub action */}
              <View style={{ marginTop: 14, alignItems: "center" }}>
                <Text style={{ color: COLORS.muted, fontSize: 14 }}>
                  Already have an account?{" "}
                  <Link href="/(auth)/userLogin" asChild>
                    <Text style={{ color: COLORS.primary, fontWeight: "800" }}>
                      Sign in
                    </Text>
                  </Link>
                </Text>
              </View>
            </View>

            <View style={{ flex: 1 }} />

            {/* Footer */}
            <Text
              style={{
                textAlign: "center",
                color: "rgba(245,245,245,0.45)",
                fontSize: 12,
                paddingVertical: 16,
              }}
            >
              Primary: {COLORS.primary} • Background: {COLORS.bg}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function FieldLabel({ label }: { label: string }) {
  return (
    <Text style={{ color: COLORS.text, fontWeight: "800", fontSize: 13 }}>
      {label}
    </Text>
  );
}

const styles = {
  input: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    fontSize: 15,
    color: COLORS.text,
    backgroundColor: COLORS.card,
    marginTop: 8,
  } as const,

  inputInner: {
    height: 52,
    paddingHorizontal: 14,
    fontSize: 15,
    color: COLORS.text,
    backgroundColor: "transparent",
  } as const,

  passwordWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    marginTop: 8,
    overflow: "hidden",
  } as const,

  pwBtn: {
    paddingHorizontal: 14,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 1,
    borderLeftColor: "rgba(255,255,255,0.10)",
  } as const,

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  } as const,

  checkboxOn: {
    backgroundColor: COLORS.primary,
  } as const,

  checkboxDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: COLORS.bg,
  } as const,

  primaryBtn: {
    height: 54,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  } as const,

  primaryBtnText: {
    color: COLORS.bg,
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 0.2,
  } as const,
};
