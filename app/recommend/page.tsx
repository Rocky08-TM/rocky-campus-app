"use client";
import { useState } from "react";
import eventsData from "@/data/events.json";
import usersData from "@/data/users.json";

/**
 * ML Feature: Tag-based K-Nearest Neighbours Event Recommender
 *
 * How it works:
 * 1. Each event is represented as a feature vector of binary tag values.
 * 2. Each user has a list of interest tags and attended events.
 * 3. We build a "user interest vector" from their interests.
 * 4. We compute cosine similarity between the user vector and each event vector.
 * 5. We return the top-K most similar events the user has NOT already attended.
 *
 * This is a lightweight classical ML approach (KNN / cosine similarity on
 * sparse tag vectors), similar to content-based filtering used in recommender systems.
 */

// Collect all unique tags from all events
const ALL_TAGS = Array.from(new Set(eventsData.flatMap((e) => e.tags)));

// Build a binary feature vector for an event
function eventVector(tags: string[]): number[] {
  return ALL_TAGS.map((tag) => (tags.includes(tag) ? 1 : 0));
}

// Build a feature vector from a list of interest strings
function interestVector(interests: string[]): number[] {
  return ALL_TAGS.map((tag) => (interests.includes(tag) ? 1 : 0));
}

// Cosine similarity between two vectors
function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  if (magA === 0 || magB === 0) return 0;
  return dot / (magA * magB);
}

// Recommend top K events for a user based on their interests
function recommend(userId: string, k = 3) {
  const user = usersData.find((u) => u.id === userId);
  if (!user) return [];

  const userVec = interestVector(user.interests);

  const scored = eventsData
    .filter((e) => !user.attendedEventIds.includes(e.id)) // exclude already attended
    .map((e) => ({
      event: e,
      score: cosineSimilarity(userVec, eventVector(e.tags)),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);

  return scored;
}

export default function RecommendPage() {
  const [selectedUser, setSelectedUser] = useState(usersData[0].id);
  const [results, setResults] = useState<ReturnType<typeof recommend>>([]);
  const [ran, setRan] = useState(false);

  const user = usersData.find((u) => u.id === selectedUser)!;

  function handleRecommend() {
    const recs = recommend(selectedUser, 3);
    setResults(recs);
    setRan(true);
  }

  return (
    <div className="page">
      <h1>Event Recommender</h1>
      <p style={{ color: "#555", fontSize: "13px", marginBottom: "6px" }}>
        This feature uses a <strong>K-Nearest Neighbours</strong> algorithm with cosine similarity on event tag vectors.
        It recommends events that best match a student&apos;s interests, excluding events they have already attended.
      </p>
      <p style={{ fontSize: "12px", color: "#666", marginBottom: "20px" }}>
        <strong>How it works:</strong> Each event is represented as a binary vector of tags (e.g. &quot;social&quot;, &quot;coding&quot;, &quot;sport&quot;).
        The student&apos;s interests are turned into a matching vector. Cosine similarity measures how closely each event aligns
        with the student&apos;s interests. The top 3 most similar unseen events are returned.
      </p>

      <div style={{ background: "#FFFFF0", border: "2px solid #8B4513", padding: "18px", maxWidth: "520px", marginBottom: "24px" }}>
        <h2>Select a student profile</h2>

        <div style={{ marginBottom: "14px", marginTop: "10px" }}>
          <label htmlFor="user-select">Student:</label>
          <select
            id="user-select"
            value={selectedUser}
            onChange={(e) => { setSelectedUser(e.target.value); setRan(false); }}
            style={{ marginTop: "4px" }}
          >
            {usersData.map((u) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
        </div>

        <p style={{ fontSize: "12px", color: "#555", marginBottom: "6px" }}>
          <strong>Interests:</strong> {user.interests.join(", ")}
        </p>
        <p style={{ fontSize: "12px", color: "#555", marginBottom: "14px" }}>
          <strong>Already attended:</strong>{" "}
          {user.attendedEventIds
            .map((id) => eventsData.find((e) => e.id === id)?.title)
            .filter(Boolean)
            .join(", ")}
        </p>

        <button onClick={handleRecommend}>Generate recommendations</button>
      </div>

      {ran && (
        <div style={{ background: "#FFFFF0", border: "2px solid #8B4513", padding: "18px", maxWidth: "620px" }}>
          <h2>Recommended events for {user.name}</h2>

          {results.length === 0 ? (
            <p style={{ fontSize: "13px", color: "#666", marginTop: "10px" }}>
              No recommendations available — this student has attended all events.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
              {results.map(({ event, score }, idx) => (
                <div
                  key={event.id}
                  style={{ borderLeft: "4px solid #8B4513", paddingLeft: "12px" }}
                >
                  <p style={{ fontWeight: "bold", fontFamily: "Georgia", fontSize: "15px", color: "#8B0000", marginBottom: "2px" }}>
                    #{idx + 1} — {event.title}
                  </p>
                  <p style={{ fontSize: "12px", color: "#555", marginBottom: "4px" }}>
                    {event.date} at {event.time} &mdash; {event.location}
                  </p>
                  <p style={{ fontSize: "13px", marginBottom: "4px" }}>{event.description}</p>
                  <p style={{ fontSize: "11px", color: "#666", fontFamily: "Courier New" }}>
                    Similarity score: {(score * 100).toFixed(1)}% match &mdash; Tags: {event.tags.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: "16px", borderTop: "1px solid #ccc", paddingTop: "12px" }}>
            <p style={{ fontSize: "11px", color: "#666" }}>
              <strong>Model evaluation note:</strong> With 7 fictional users and 10 events, this is a demonstration dataset.
              In a real deployment, accuracy would be assessed using a train/test split — e.g. hiding the last attended event per user
              and checking whether it appears in the top-3 recommendations (hit rate metric).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
