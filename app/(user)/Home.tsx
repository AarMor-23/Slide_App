// Home.js (Student/User Home) — “Find something good fast” + personal, not cluttered
// Drop into: app/(tabs)/Home.js  (or wherever your user home screen lives)

import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const { width: W } = Dimensions.get("window");

const COLORS = {
  bg: "#FFFFFF",
  text: "#111111",
  muted: "rgba(17,17,17,0.60)",
  faint: "rgba(17,17,17,0.40)",
  card: "#FFFFFF",
  border: "rgba(0,0,0,0.08)",
  chipBg: "rgba(0,0,0,0.05)",
  chipActiveBg: "rgba(0,0,0,0.10)",
  primary: "#111111", // keep neutral for now (change later)
  accent: "#73ffad",  // optional accent if you want (not used heavily)
};

export default function Home() {
  const campus = "Near UIC";

  const [query, setQuery] = useState("");
  const [activeChips, setActiveChips] = useState(["Open now"]);

  const chips = useMemo(
    () => [
      "Open now",
      "Under $10",
      "Closest",
      "Late night",
      "Study-friendly",
      "Halal",
      "Veg",
      "Vegan",
      "Gluten-free",
    ],
    []
  );

  const forYou = useMemo(
    () => ({
      id: "fy1",
      title: "BOGO Smoothies",
      business: "Hana Dragons",
      distance: "0.4 mi",
      timeLeft: "2d left",
      image: "https://picsum.photos/900/700?random=41",
      tag: "For You • Rotates daily",
    }),
    []
  );

  const trending = useMemo(
    () => [
      {
        id: "t1",
        title: "🔥 Popular this week",
        business: "Taylor Street Pizza",
        image: "https://picsum.photos/600/600?random=11",
        saves: 184,
        redemptions: 76,
      },
      {
        id: "t2",
        title: "🔥 Trending near campus",
        business: "Boba Corner",
        image: "https://picsum.photos/600/600?random=12",
        saves: 231,
        redemptions: 92,
      },
      {
        id: "t3",
        title: "🔥 Late-night favorite",
        business: "Gyro Hub",
        image: "https://picsum.photos/600/600?random=13",
        saves: 145,
        redemptions: 61,
      },
    ],
    []
  );

  const categories = useMemo(
    () => [
      { id: "c1", name: "Coffee", icon: "cafe-outline" },
      { id: "c2", name: "Pizza", icon: "pizza-outline" },
      { id: "c3", name: "Boba", icon: "water-outline" },
      { id: "c4", name: "Desserts", icon: "ice-cream-outline" },
      { id: "c5", name: "Healthy", icon: "leaf-outline" },
      { id: "c6", name: "Late Night", icon: "moon-outline" },
      { id: "c7", name: "Groceries", icon: "basket-outline" },
      { id: "c8", name: "Services", icon: "construct-outline" },
    ],
    []
  );

  const newDeals = useMemo(
    () => [
      {
        id: "n1",
        title: "Free fries w/ burger",
        business: "Burger Lab",
        meta: "0.6 mi • Posted 2h ago",
        image: "https://picsum.photos/900/700?random=21",
        badge: "New",
      },
      {
        id: "n2",
        title: "$2 off any coffee (6–10pm)",
        business: "Study Café",
        meta: "0.2 mi • Posted 5h ago",
        image: "https://picsum.photos/900/700?random=22",
        badge: "New",
      },
      {
        id: "n3",
        title: "20% off boba (open now)",
        business: "Boba Corner",
        meta: "0.5 mi • Posted 1d ago",
        image: "https://picsum.photos/900/700?random=23",
        badge: "Hot",
      },
    ],
    []
  );

  const friends = useMemo(
    () => [
      { id: "f1", who: "Dev", action: "saved", what: "3 late-night spots" },
      { id: "f2", who: "Ariana", action: "redeemed", what: "BOGO Smoothies" },
    ],
    []
  );

  const toggleChip = (label: string) => {
    setActiveChips((prev) => {
      if (prev.includes(label)) return prev.filter((x) => x !== label);
      return [...prev, label];
    });
  };

  const onSearch = () => {
    Alert.alert("Search", query.trim() ? `Searching: "${query}"` : "Type something to search");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* 1) Top bar */}
        <View style={styles.topBar}>
          <View style={{ flex: 1 }}>
            <Text style={styles.brand}>campus deals</Text>
            <Pressable
              onPress={() => Alert.alert("Campus", "Campus selector later")}
              style={({ pressed }) => [styles.campusRow, pressed && { opacity: 0.7 }]}
            >
              <Ionicons name="location-outline" size={16} color={COLORS.muted} />
              <Text style={styles.campusText}>{campus}</Text>
              <Ionicons name="chevron-down" size={16} color={COLORS.muted} />
            </Pressable>
          </View>

          <View style={styles.iconRow}>
            <IconBtn icon="calendar-outline" onPress={() => Alert.alert("Calendar", "Later")} />
            <IconBtn
              icon="notifications-outline"
              badge="1"
              onPress={() => Alert.alert("Notifications", "Later")}
            />
            <IconBtn icon="menu-outline" onPress={() => Alert.alert("Menu", "Later")} />
          </View>
        </View>

        {/* Search + quick filter */}
        <View style={styles.searchRow}>
          <View style={styles.searchWrap}>
            <Ionicons name="search-outline" size={18} color={COLORS.faint} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search coffee, boba, under $10, open now"
              placeholderTextColor="rgba(17,17,17,0.35)"
              style={styles.searchInput}
              returnKeyType="search"
              onSubmitEditing={onSearch}
            />
          </View>

          <Pressable
            onPress={() => Alert.alert("Filters", "Open filter sheet later")}
            style={({ pressed }) => [styles.filterBtn, pressed && { opacity: 0.75 }]}
            hitSlop={10}
          >
            <Ionicons name="options-outline" size={20} color={COLORS.text} />
          </Pressable>
        </View>

        {/* 2) Quick filters row (chips) */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
          <View style={{ flexDirection: "row", gap: 10, paddingVertical: 4 }}>
            {chips.map((c) => {
              const active = activeChips.includes(c);
              return (
                <Pressable
                  key={c}
                  onPress={() => toggleChip(c)}
                  style={({ pressed }) => [
                    styles.chip,
                    active && styles.chipActive,
                    pressed && { opacity: 0.85 },
                  ]}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{c}</Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        {/* 3) “For You” featured card */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>For You</Text>
          <Text style={styles.sectionRight}>Updated daily</Text>
        </View>

        <Pressable
          onPress={() => Alert.alert("Deal", `${forYou.title} • ${forYou.business}`)}
          style={({ pressed }) => [pressed && { opacity: 0.95 }]}
        >
          <ImageBackground source={{ uri: forYou.image }} style={styles.featureCard} imageStyle={styles.featureImg}>
            <View style={styles.featureOverlay} />
            <View style={styles.featureTop}>
              <View style={styles.pillLight}>
                <Text style={styles.pillLightText}>{forYou.tag}</Text>
              </View>
            </View>

            <View style={styles.featureBottom}>
              <Text style={styles.featureTitle}>{forYou.title}</Text>
              <Text style={styles.featureSub}>
                {forYou.business} • {forYou.distance} • {forYou.timeLeft}
              </Text>

              <View style={styles.featureActions}>
                <Pressable
                  onPress={() => Alert.alert("Redeem", "Redeem flow later")}
                  style={({ pressed }) => [styles.primaryBtn, pressed && { opacity: 0.85 }]}
                >
                  <Text style={styles.primaryBtnText}>Redeem</Text>
                </Pressable>

                <Pressable
                  onPress={() => Alert.alert("Saved", "Saved!")}
                  style={({ pressed }) => [styles.secondaryBtn, pressed && { opacity: 0.85 }]}
                >
                  <Ionicons name="heart-outline" size={18} color="#fff" />
                  <Text style={styles.secondaryBtnText}>Save</Text>
                </Pressable>
              </View>
            </View>
          </ImageBackground>
        </Pressable>

        {/* 4) Trending near you */}
        <View style={[styles.sectionRow, { marginTop: 18 }]}>
          <Text style={styles.sectionTitle}>Trending near you</Text>
          <Pressable onPress={() => Alert.alert("Trending", "See all later")} hitSlop={10}>
            <Text style={styles.link}>See all</Text>
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
          <View style={{ flexDirection: "row", gap: 12 }}>
            {trending.map((t) => (
              <Pressable
                key={t.id}
                onPress={() => Alert.alert("Trending item", t.business)}
                style={({ pressed }) => [styles.trendCard, pressed && { opacity: 0.92 }]}
              >
                <Image source={{ uri: t.image }} style={styles.trendImg} />
                <Text style={styles.trendTitle} numberOfLines={1}>
                  {t.title}
                </Text>
                <Text style={styles.trendBiz} numberOfLines={1}>
                  {t.business}
                </Text>
                <Text style={styles.trendProof}>
                  {t.saves} saves • {t.redemptions} redemptions
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        {/* 5) Categories grid */}
        <View style={[styles.sectionRow, { marginTop: 18 }]}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <Text style={styles.sectionRight}>Quick entry</Text>
        </View>

        <View style={styles.grid}>
          {categories.map((c) => (
            <Pressable
              key={c.id}
              onPress={() => Alert.alert("Category", c.name)}
              style={({ pressed }) => [styles.catCard, pressed && { opacity: 0.85 }]}
            >
              <View style={styles.catIconWrap}>
                <Ionicons name={c.icon} size={18} color={COLORS.text} />
              </View>
              <Text style={styles.catText}>{c.name}</Text>
            </Pressable>
          ))}
        </View>

        {/* 6) New deals */}
        <View style={[styles.sectionRow, { marginTop: 18 }]}>
          <Text style={styles.sectionTitle}>New deals</Text>
          <Pressable onPress={() => Alert.alert("New deals", "See all later")} hitSlop={10}>
            <Text style={styles.link}>See all</Text>
          </Pressable>
        </View>

        <View style={{ gap: 12, marginTop: 10 }}>
          {newDeals.map((d) => (
            <Pressable
              key={d.id}
              onPress={() => Alert.alert("Deal", `${d.title} • ${d.business}`)}
              style={({ pressed }) => [styles.feedCard, pressed && { opacity: 0.95 }]}
            >
              <Image source={{ uri: d.image }} style={styles.feedImg} />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                  <Text style={styles.feedTitle} numberOfLines={1}>
                    {d.title}
                  </Text>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{d.badge}</Text>
                  </View>
                </View>

                <Text style={styles.feedBiz} numberOfLines={1}>
                  {d.business}
                </Text>
                <Text style={styles.feedMeta}>{d.meta}</Text>

                <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
                  <Pressable
                    onPress={() => Alert.alert("Save", "Saved!")}
                    style={({ pressed }) => [styles.smallGhost, pressed && { opacity: 0.8 }]}
                  >
                    <Ionicons name="heart-outline" size={16} color={COLORS.text} />
                    <Text style={styles.smallGhostText}>Save</Text>
                  </Pressable>

                  <Pressable
                    onPress={() => Alert.alert("Redeem", "Redeem flow later")}
                    style={({ pressed }) => [styles.smallPrimary, pressed && { opacity: 0.85 }]}
                  >
                    <Text style={styles.smallPrimaryText}>Redeem</Text>
                  </Pressable>
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        {/* 7) Friends activity (optional) */}
        <View style={[styles.sectionRow, { marginTop: 18 }]}>
          <Text style={styles.sectionTitle}>Friends activity</Text>
          <Pressable onPress={() => Alert.alert("Settings", "Toggle this section in settings later")} hitSlop={10}>
            <Text style={styles.sectionRight}>Optional</Text>
          </Pressable>
        </View>

        <View style={{ gap: 10, marginTop: 10, paddingBottom: 30 }}>
          {friends.map((f) => (
            <View key={f.id} style={styles.friendRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{initials(f.who)}</Text>
              </View>
              <Text style={styles.friendText}>
                <Text style={{ fontWeight: "800" }}>{f.who}</Text> {f.action}{" "}
                <Text style={{ fontWeight: "800" }}>{f.what}</Text>
              </Text>
            </View>
          ))}

          <View style={{ flexDirection: "row", gap: 10 }}>
            <Pressable
              onPress={() => Alert.alert("Add friends", "Add friends flow later")}
              style={({ pressed }) => [styles.friendBtn, pressed && { opacity: 0.85 }]}
            >
              <Text style={styles.friendBtnText}>Add friends</Text>
            </Pressable>

            <Pressable
              onPress={() => Alert.alert("Friends", "See more activity later")}
              style={({ pressed }) => [styles.friendBtnGhost, pressed && { opacity: 0.85 }]}
            >
              <Text style={styles.friendBtnGhostText}>See more</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- small components ---------- */

function IconBtn({ icon, badge, onPress }: { icon: string; badge?: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} hitSlop={10} style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.6 }]}>
      <Ionicons name={icon} size={22} color={COLORS.text} />
      {badge ? (
        <View style={styles.badgeDot}>
          <Text style={styles.badgeDotText}>{badge}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

function initials(name: string) {
  const parts = name.trim().split(" ");
  const a = parts[0]?.[0] ?? "";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase();
}

/* ---------- styles ---------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  content: { paddingHorizontal: 16, paddingTop: 12 },

  topBar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  brand: { fontSize: 22, fontWeight: "900", color: COLORS.text, letterSpacing: -0.4 },
  campusRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 6 },
  campusText: { color: COLORS.muted, fontSize: 13, fontWeight: "700" },

  iconRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  badgeDot: {
    position: "absolute",
    right: 6,
    top: 6,
    minWidth: 16,
    height: 16,
    borderRadius: 999,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeDotText: { color: "#fff", fontSize: 10, fontWeight: "900" },

  searchRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 14 },
  searchWrap: {
    flex: 1,
    height: 46,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "rgba(0,0,0,0.03)",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchInput: { flex: 1, color: COLORS.text, fontSize: 14, fontWeight: "600" },

  filterBtn: {
    width: 46,
    height: 46,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  chip: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: COLORS.chipBg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipActive: {
    backgroundColor: COLORS.chipActiveBg,
    borderColor: "rgba(0,0,0,0.14)",
  },
  chipText: { color: COLORS.text, fontWeight: "700", fontSize: 13 },
  chipTextActive: { fontWeight: "900" },

  sectionRow: { flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", marginTop: 16 },
  sectionTitle: { color: COLORS.text, fontSize: 16, fontWeight: "900" },
  sectionRight: { color: COLORS.faint, fontSize: 12, fontWeight: "700" },
  link: { color: COLORS.text, fontSize: 12, fontWeight: "900" },

  featureCard: {
    width: "100%",
    height: 220,
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: "space-between",
  },
  featureImg: { borderRadius: 20 },
  featureOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.32)",
  },
  featureTop: { padding: 14 },
  pillLight: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.92)",
  },
  pillLightText: { color: "#111", fontSize: 12, fontWeight: "900" },

  featureBottom: { padding: 14 },
  featureTitle: { color: "#fff", fontSize: 20, fontWeight: "900", letterSpacing: -0.3 },
  featureSub: { color: "rgba(255,255,255,0.85)", marginTop: 6, fontSize: 13, fontWeight: "700" },
  featureActions: { flexDirection: "row", gap: 10, marginTop: 12 },

  primaryBtn: {
    flex: 1,
    height: 46,
    borderRadius: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnText: { color: "#111", fontWeight: "900", fontSize: 14 },

  secondaryBtn: {
    flex: 1,
    height: 46,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.55)",
    backgroundColor: "rgba(0,0,0,0.18)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  secondaryBtnText: { color: "#fff", fontWeight: "900", fontSize: 14 },

  trendCard: {
    width: 170,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  trendImg: { width: "100%", height: 110, backgroundColor: "rgba(0,0,0,0.05)" },
  trendTitle: { paddingHorizontal: 12, paddingTop: 10, color: COLORS.text, fontWeight: "900", fontSize: 13 },
  trendBiz: { paddingHorizontal: 12, paddingTop: 4, color: COLORS.muted, fontWeight: "700", fontSize: 12 },
  trendProof: { paddingHorizontal: 12, paddingTop: 6, paddingBottom: 12, color: COLORS.faint, fontWeight: "700", fontSize: 12 },

  grid: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  catCard: {
    width: (W - 16 * 2 - 10 * 3) / 4,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#fff",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  catIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.05)",
    alignItems: "center",
    justifyContent: "center",
  },
  catText: { color: COLORS.text, fontSize: 11, fontWeight: "900", textAlign: "center" },

  feedCard: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  feedImg: { width: 88, height: 88, borderRadius: 16, backgroundColor: "rgba(0,0,0,0.06)" },
  feedTitle: { color: COLORS.text, fontSize: 14, fontWeight: "900", flex: 1 },
  feedBiz: { color: COLORS.muted, marginTop: 4, fontSize: 12, fontWeight: "700" },
  feedMeta: { color: COLORS.faint, marginTop: 6, fontSize: 12, fontWeight: "700" },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.06)",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  badgeText: { color: COLORS.text, fontWeight: "900", fontSize: 11 },

  smallGhost: {
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "rgba(0,0,0,0.03)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  smallGhostText: { color: COLORS.text, fontWeight: "900", fontSize: 12 },

  smallPrimary: {
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  smallPrimaryText: { color: "#fff", fontWeight: "900", fontSize: 12 },

  friendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.06)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  avatarText: { color: COLORS.text, fontWeight: "900" },
  friendText: { color: COLORS.text, fontSize: 13, fontWeight: "700", flex: 1 },

  friendBtn: {
    flex: 1,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  friendBtnText: { color: "#fff", fontWeight: "900" },

  friendBtnGhost: {
    flex: 1,
    height: 44,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "rgba(0,0,0,0.03)",
    alignItems: "center",
    justifyContent: "center",
  },
  friendBtnGhostText: { color: COLORS.text, fontWeight: "900" },
});
