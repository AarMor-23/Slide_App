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

export default function BusinessLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => {
    const e = email.trim();
    return e.length > 3 && e.includes("@") && password.length >= 6 && !loading;
  }, [email, password, loading]);

  const onLogin = async () => {
    if (!canSubmit) return;

    setLoading(true);
    try {
      // TODO: replace with your auth call
      await new Promise((r) => setTimeout(r, 600));

      // Example: route to your main app
      router.replace("/"); // or "/(tabs)" if you use a tabs group
    } catch (e) {
      Alert.alert("Login failed", "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#151515" }}>
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
                  fontSize: 48,
                  fontWeight: "800",
                  color: "#73ffad",
                  letterSpacing: -0.4,
                }}
              >
                Slide
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  color: "#fff",
                  marginTop: 4,
                }}
              >
                Business Login
              </Text>
            </View>

            {/* Form */}
            <View style={{ marginTop: 26, gap: 14 }}>
              <Text style={{color: "#fff"}}>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="business@example.com"
                placeholderTextColor="#9a9a9a"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />

              <View style={{ marginTop: 6 }}>
                <Text style={{ color: "#fff" }}>Password</Text>
              </View>

              <View style={styles.passwordWrap}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  placeholderTextColor="#9a9a9a"
                  secureTextEntry={!showPw}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={[styles.input, { flex: 1, marginTop: 0, borderWidth: 0 }]}
                />
                <Pressable
                  onPress={() => setShowPw((s) => !s)}
                  hitSlop={10}
                  style={({ pressed }) => [
                    styles.pwBtn,
                    pressed && { opacity: 0.7 },
                  ]}
                >
                  <Text style={{ color: "#111", fontWeight: "600" }}>
                    {showPw ? "Hide" : "Show"}
                  </Text>
                </Pressable>
              </View>

              {/* Row: remember + forgot */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 4,
                }}
              >
                <Pressable
                  onPress={() => setRemember((r) => !r)}
                  style={({ pressed }) => [
                    { flexDirection: "row", alignItems: "center", gap: 10 },
                    pressed && { opacity: 0.7 },
                  ]}
                >
                  <View
                    style={[
                      styles.checkbox,
                      remember && styles.checkboxOn,
                    ]}
                  >
                    {remember ? <View style={styles.checkboxDot} /> : null}
                  </View>
                  <Text style={{ color: "#fff", fontSize: 14 }}>
                    Remember me
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => Alert.alert("Forgot password", "Wire this up later.")}
                  hitSlop={10}
                  style={({ pressed }) => [pressed && { opacity: 0.7 }]}
                >
                  <Text style={{ color: "#111", fontWeight: "600" }}>
                    Forgot?
                  </Text>
                </Pressable>
              </View>

              {/* Login button */}
              <Pressable
                onPress={onLogin}
                disabled={!canSubmit}
                style={({ pressed }) => [
                  styles.primaryBtn,
                  !canSubmit && { opacity: 0.45 },
                  pressed && canSubmit && { transform: [{ scale: 0.99 }] },
                ]}
              >
                <Text style={styles.primaryBtnText}>
                  {loading ? "Signing in…" : "Sign in"}
                </Text>
              </Pressable>

              {/* Divider */}
              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social (placeholders) */}
              <View style={{ gap: 10 }}>
                <OutlineBtn
                  label="Continue with Apple"
                  onPress={() => Alert.alert("Apple login", "Add later.")}
                />
                <OutlineBtn
                  label="Continue with Google"
                  onPress={() => Alert.alert("Google login", "Add later.")}
                />
              </View>

              {/* Bottom */}
              <View style={{ marginTop: 18, alignItems: "center" }}>
                <Text style={{ color: "#555", fontSize: 14 }}>
                  New business?{" "}
                  <Link href="/(auth)/businessRegister" asChild>
                    <Text style={{ color: "#73ffad", fontWeight: "700" }}>
                      Create an account
                    </Text>
                  </Link>
                </Text>
                <Text style={{ color: "#555", fontSize: 14, marginTop: 10 }}>
                  Are You a User?{" "}
                  <Link href="/(auth)/userLogin" asChild>
                    <Text style={{ color: "#73ffad", fontWeight: "700" }}>
                      Login
                    </Text>
                  </Link>
                </Text>
              </View>
            </View>

            {/* Footer space */}
            <View style={{ flex: 1 }} />
            <Text style={{ textAlign: "center", color: "#777", fontSize: 12, paddingVertical: 16 }}>
              By continuing you agree to the Terms & Privacy Policy
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function OutlineBtn({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.outlineBtn,
        pressed && { opacity: 0.75 },
      ]}
    >
      <Text style={styles.outlineBtnText}>{label}</Text>
    </Pressable>
  );
}

const styles = {
  input: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#fff",
    backgroundColor: "#151515",
    marginTop: 8,
  } as const,

  passwordWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
    marginTop: 8,
    paddingLeft: 0,
  } as const,

  pwBtn: {
    paddingHorizontal: 14,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 1,
    borderLeftColor: "#fff",
  } as const,

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  } as const,
  checkboxOn: {
    backgroundColor: "#73ffad",
  } as const,
  checkboxDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#fff",
  } as const,

  primaryBtn: {
    height: 54,
    borderRadius: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  } as const,
  primaryBtnText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.2,
  } as const,

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 18,
  } as const,
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ededed",
  } as const,
  dividerText: {
    color: "#777",
    fontSize: 13,
    fontWeight: "600",
  } as const,

  outlineBtn: {
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  } as const,
  outlineBtnText: {
    color: "#111",
    fontSize: 15,
    fontWeight: "700",
  } as const,
};
