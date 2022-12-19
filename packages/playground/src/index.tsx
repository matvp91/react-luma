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
  const [items, setItems] = useState<
    {
      id: string;
      poster_path: string;
    }[]
  >([]);

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
      <Text style={{ marginBottom: 6 }} text={props.title} />
      <FocusSection id={props.id}>
        <View style={{ flexDirection: "row" }}>
          {items.map((item) => (
            <Focusable key={item.id}>
              {(hasFocus) => (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  color={hasFocus ? "#ff0000" : "#ffffff"}
                  style={{ marginRight: 12, width: 100, height: 150 }}
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
            {(hasFocus) => (
              <View style={{ width: hasFocus ? 100 : 25 }}>
                <View style={{ flexDirection: "row", marginBottom: 12 }}>
                  <Focusable>
                    {(hasFocus) => (
                      <Text
                        text="One"
                        color={hasFocus ? "#ff0000" : "#000000"}
                      />
                    )}
                  </Focusable>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 12 }}>
                  <Focusable>
                    {(hasFocus) => (
                      <Text
                        text="Two"
                        color={hasFocus ? "#ff0000" : "#000000"}
                      />
                    )}
                  </Focusable>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Focusable>
                    {(hasFocus) => (
                      <Text
                        text="Three"
                        color={hasFocus ? "#ff0000" : "#000000"}
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
        </View>
      </View>
    </NavProvider>
  );
}

const container = document.getElementById("root");
if (container instanceof HTMLCanvasElement) {
  render(<App />, container);
}
