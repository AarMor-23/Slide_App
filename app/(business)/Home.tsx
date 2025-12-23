// Home.js (Business Home Page - simplified)
// Shows: Business name + photo carousel, Overview stats, Most recent reviews (dummy data)

import React, { useMemo, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const COLORS = {
  primary: "#73ffad",
  bg: "#151515",
  text: "#F5F5F5",
  muted: "rgba(245,245,245,0.65)",
  faint: "rgba(245,245,245,0.40)",
  card: "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.10)",
  chip: "rgba(115,255,173,0.12)",
  danger: "rgba(255,120,120,0.95)",
};

const { width: SCREEN_W } = Dimensions.get("window");
const CAROUSEL_W = SCREEN_W - 32;
const CAROUSEL_H = 180;

export default function Home() {
  // Dummy business data
  const business = useMemo(
    () => ({
      name: "Hana Dragons",
      category: "Asian Fusion • Taylor St",
      photos: [
        // Replace with your own local images or hosted URLs
        { id: "p1", uri: "https://picsum.photos/900/500?random=21" },
        { id: "p2", uri: "https://picsum.photos/900/500?random=22" },
        { id: "p3", uri: "https://picsum.photos/900/500?random=23" },
      ],
    }),
    []
  );

  // Dummy overview stats (last 7 days)
  const overview = useMemo(
    () => [
      { key: "views", label: "Views", value: 1284, trend: +12 },
      { key: "saves", label: "Saves", value: 346, trend: +4 },
      { key: "redemptions", label: "Redemptions", value: 97, trend: -6 },
    ],
    []
  );

  // Dummy reviews
  const reviews = useMemo(
    () => [
      {
        id: "r1",
        name: "Maya",
        rating: 5,
        time: "2 days ago",
        text: "Super easy to redeem and the staff was really nice. Great deal.",
      },
      {
        id: "r2",
        name: "Jason",
        rating: 4,
        time: "5 days ago",
        text: "Good value near campus. Would love more weekend options.",
      },
      {
        id: "r3",
        name: "Ariana",
        rating: 5,
        time: "1 week ago",
        text: "Food was fire. Deal was exactly as described. No issues.",
      },
    ],
    []
  );

  const [activePhoto, setActivePhoto] = useState(0);

  const onPhotoTap = () => {
    Alert.alert("Business Photos", "Open full gallery screen later.");
  };

  const onSeeAllReviews = () => {
    Alert.alert("Reviews", "Open reviews screen later.");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Business Header */}
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{business.name}</Text>
            <Text style={styles.sub}>{business.category}</Text>
          </View>

          <Pressable
            onPress={() => Alert.alert("Edit Profile", "Go to business profile editor later.")}
            style={({ pressed }) => [styles.editBtn, pressed && { opacity: 0.75 }]}
          >
            <Text style={styles.editBtnText}>Edit</Text>
          </Pressable>
        </View>

        {/* Photos Carousel */}
        <Pressable onPress={onPhotoTap} style={({ pressed }) => [pressed && { opacity: 0.95 }]}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const x = e.nativeEvent.contentOffset.x;
              const idx = Math.round(x / CAROUSEL_W);
              setActivePhoto(idx);
            }}
            scrollEventThrottle={16}
            style={{ marginTop: 14 }}
          >
            {business.photos.map((p) => (
              <View key={p.id} style={{ width: CAROUSEL_W }}>
                <Image source={{ uri: p.uri }} style={styles.photo} />
              </View>
            ))}
          </ScrollView>
        </Pressable>

        {/* Dots */}
        <View style={styles.dotsRow}>
          {business.photos.map((p, idx) => (
            <View
              key={p.id}
              style={[
                styles.dot,
                idx === activePhoto && { backgroundColor: COLORS.primary, opacity: 1 },
              ]}
            />
          ))}
        </View>

        {/* Overview */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.sectionRight}>Last 7 days</Text>
        </View>

        <View style={styles.statsRow}>
          {overview.map((s) => (
            <Pressable
              key={s.key}
              onPress={() => Alert.alert("Analytics", `${s.label}\n\nOpen detailed analytics later.`)}
              style={({ pressed }) => [styles.statCard, pressed && { transform: [{ scale: 0.99 }] }]}
            >
              <Text style={styles.statLabel}>{s.label}</Text>
              <Text style={styles.statValue}>{s.value}</Text>

              <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center", gap: 8 }}>
                <TrendPill trend={s.trend} />
                <Text style={styles.statHelper}>vs last week</Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Most recent reviews */}
        <View style={[styles.sectionRow, { marginTop: 18 }]}>
          <Text style={styles.sectionTitle}>Most Recent Reviews</Text>

          <Pressable onPress={onSeeAllReviews} hitSlop={10} style={({ pressed }) => [pressed && { opacity: 0.75 }]}>
            <Text style={styles.link}>See all</Text>
          </Pressable>
        </View>

        <View style={{ gap: 12, paddingBottom: 24 }}>
          {reviews.map((r) => (
            <View key={r.id} style={styles.reviewCard}>
              <View style={styles.reviewTopRow}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10, flex: 1 }}>
                  <Avatar initials={initials(r.name)} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.reviewName}>{r.name}</Text>
                    <Text style={styles.reviewMeta}>{r.time}</Text>
                  </View>
                </View>
                <Stars rating={r.rating} />
              </View>

              <Text style={styles.reviewText}>{r.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function TrendPill({ trend }: { trend: number }) {
  const up = trend >= 0;
  return (
    <View
      style={[
        styles.trendPill,
        { borderColor: up ? "rgba(115,255,173,0.35)" : "rgba(255,120,120,0.35)" },
      ]}
    >
      <Text style={[styles.trendText, { color: up ? COLORS.primary : COLORS.danger }]}>
        {up ? "↑" : "↓"} {Math.abs(trend)}%
      </Text>
    </View>
  );
}

function Stars({ rating }: { rating: number }) {
  const full = "★".repeat(rating);
  const empty = "☆".repeat(Math.max(0, 5 - rating));
  return (
    <View style={{ flexDirection: "row", gap: 2 }}>
      <Text style={{ color: COLORS.primary, fontWeight: "900" }}>{full}</Text>
      <Text style={{ color: "rgba(245,245,245,0.25)", fontWeight: "900" }}>{empty}</Text>
    </View>
  );
}

function Avatar({ initials }: { initials: string }) {
  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{initials}</Text>
    </View>
  );
}

function initials(name: string): string {
  const parts = name.trim().split(" ");
  const a = parts[0]?.[0] ?? "";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase();
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  content: { paddingHorizontal: 16, paddingTop: 12 },

  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  title: { color: COLORS.text, fontSize: 22, fontWeight: "900", letterSpacing: -0.3 },
  sub: { color: COLORS.faint, marginTop: 3, fontSize: 12 },

  editBtn: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: "rgba(115,255,173,0.12)",
    borderWidth: 1,
    borderColor: "rgba(115,255,173,0.30)",
    alignItems: "center",
    justifyContent: "center",
  },
  editBtnText: { color: COLORS.primary, fontWeight: "900", fontSize: 13 },

  photo: {
    width: CAROUSEL_W,
    height: CAROUSEL_H,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  dotsRow: { flexDirection: "row", justifyContent: "center", gap: 8, marginTop: 10 },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: "rgba(245,245,245,0.22)",
    opacity: 0.9,
  },

  sectionRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", marginTop: 10 },
  sectionTitle: { color: COLORS.text, fontSize: 16, fontWeight: "900" },
  sectionRight: { color: COLORS.faint, fontSize: 12 },

  statsRow: { flexDirection: "row", gap: 12, marginTop: 12 },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 12,
  },
  statLabel: { color: COLORS.muted, fontSize: 12, fontWeight: "800" },
  statValue: { color: COLORS.text, fontSize: 20, fontWeight: "900", marginTop: 6 },
  statHelper: { color: COLORS.faint, fontSize: 12 },

  trendPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.03)",
  },
  trendText: { fontSize: 12, fontWeight: "900" },

  link: { color: COLORS.primary, fontWeight: "900", fontSize: 13 },

  reviewCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 14,
  },
  reviewTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  reviewName: { color: COLORS.text, fontWeight: "900", fontSize: 14 },
  reviewMeta: { color: COLORS.faint, fontSize: 12, marginTop: 2 },
  reviewText: { color: COLORS.muted, marginTop: 10, fontSize: 13, lineHeight: 18 },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: "rgba(115,255,173,0.14)",
    borderWidth: 1,
    borderColor: "rgba(115,255,173,0.30)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: COLORS.primary, fontWeight: "900" },
});
