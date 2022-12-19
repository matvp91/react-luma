import React, { useState, useEffect } from "react";
import { render, View, Image, Text } from "react-luma";
import { NavProvider, FocusSection, Focusable } from "react-luma/navigation";

const TMDB_API_KEY = "fbba46e1c3147f982c3b7d32995add6b";

type SwimlaneProps = {
  id: string;
  title: string;
  tmdbPath: string;
};

function Swimlane(props: SwimlaneProps) {
  const [left, setLeft] = useState(0);
  const [items, setItems] = useState<
    {
      id: string;
      poster_path: string;
    }[]
  >([]);

  window.setLeft = setLeft;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3${props.tmdbPath}?api_key=${TMDB_API_KEY}`
      );
      const data = await response.json();
      setItems(data.results);
    };
    fetchData();
  }, [props.tmdbPath]);

  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ marginBottom: 6 }} text={props.title} color="#ffffff" />
      <FocusSection id={props.id}>
        <View style={{ flexDirection: "row", left }}>
          {items.map((item) => (
            <Focusable key={item.id}>
              {(hasFocus) => (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  tint={hasFocus ? "#ff0000" : "#ffffff"}
                  style={{ marginRight: 12, width: 50, height: 75 }}
                />
              )}
            </Focusable>
          ))}
        </View>
      </FocusSection>
    </View>
  );
}

function App() {
  return (
    <NavProvider defaultSectionId="menu">
      <View style={{ flexDirection: "row", padding: 12 }}>
        <View style={{ flexDirection: "column" }}>
          <FocusSection id="menu">
            {(hasSectionFocus) => (
              <View style={{ width: hasSectionFocus ? 100 : 25 }}>
                <View style={{ flexDirection: "row", marginBottom: 12 }}>
                  <Focusable>
                    {(hasFocus) => (
                      <Text
                        text={hasSectionFocus ? "One" : "O"}
                        color={hasFocus ? "#ff0000" : "#ffffff"}
                      />
                    )}
                  </Focusable>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 12 }}>
                  <Focusable>
                    {(hasFocus) => (
                      <Text
                        text={hasSectionFocus ? "Two" : "T"}
                        color={hasFocus ? "#ff0000" : "#ffffff"}
                      />
                    )}
                  </Focusable>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Focusable>
                    {(hasFocus) => (
                      <Text
                        text={hasSectionFocus ? "Three" : "T"}
                        color={hasFocus ? "#ff0000" : "#ffffff"}
                      />
                    )}
                  </Focusable>
                </View>
              </View>
            )}
          </FocusSection>
        </View>
        <View style={{ marginLeft: 12 }}>
          <Swimlane
            id="swimlane_top_movies"
            title="Top movies"
            tmdbPath="/movie/popular"
          />
          <Swimlane
            id="swimlane_popular_tv"
            title="Top on TV"
            tmdbPath="/tv/popular"
          />
          <Swimlane
            id="swimlane_upcoming_movies"
            title="Upcoming movies"
            tmdbPath="/movie/upcoming"
          />
          <Swimlane
            id="swimlane_toprated_tv"
            title="Top rated TV"
            tmdbPath="/tv/top_rated"
          />
          <Swimlane
            id="swimlane_toprated_movies"
            title="Top rated movies"
            tmdbPath="/movie/top_rated"
          />
        </View>
      </View>
    </NavProvider>
  );
}

const container = document.getElementById("root");
if (container instanceof HTMLCanvasElement) {
  render(<App />, container);
}
