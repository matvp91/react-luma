import { useState, useEffect, useRef } from "react";
import { render, View, Text, Sprite, Image, TEXTURE_WHITE } from "react-luma";
import {
  NavProvider,
  FocusSection,
  Focusable,
  useNavigation,
} from "react-luma/navigation";
import type { ReactLumaElement } from "react-luma";

const TMDB_API_KEY = "fbba46e1c3147f982c3b7d32995add6b";

type SwimlaneProps = {
  id: string;
  title: string;
  tmdbPath: string;
};

function Swimlane(props: SwimlaneProps) {
  const containerRef = useRef<ReactLumaElement>();

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

  const nav = useNavigation();

  const [left, setLeft] = useState(0);
  useEffect(() => {
    if (nav.focusedElement && containerRef.current) {
      const delta =
        containerRef.current.displayObject.getBounds().left -
        nav.focusedElement.displayObject.getBounds().left;
      setLeft(delta);
    }
  }, [nav.focusedElement]);

  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ marginBottom: 6 }} text={props.title} />
      <FocusSection id={props.id}>
        <View
          ref={containerRef}
          style={{ flexDirection: "row" }}
          transform={{ left }}
        >
          {items.map((item) => (
            <Focusable key={item.id}>
              {(hasFocus) => (
                <Sprite
                  style={{ padding: 6 }}
                  tint={hasFocus ? "#ff0000" : "#ffffff"}
                  texture={TEXTURE_WHITE}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    style={{ width: 100, height: 150 }}
                  />
                </Sprite>
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
                        fill={hasFocus ? "#ff0000" : "#000000"}
                      />
                    )}
                  </Focusable>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 12 }}>
                  <Focusable>
                    {(hasFocus) => (
                      <Text
                        text={hasSectionFocus ? "Two" : "T"}
                        fill={hasFocus ? "#ff0000" : "#000000"}
                      />
                    )}
                  </Focusable>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Focusable>
                    {(hasFocus) => (
                      <Text
                        text={hasSectionFocus ? "Three" : "T"}
                        fill={hasFocus ? "#ff0000" : "#000000"}
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
          {/* <Swimlane
            id="swimlane_toprated_tv"
            title="Top rated TV"
            tmdbPath="/tv/top_rated"
          />
          <Swimlane
            id="swimlane_toprated_movies"
            title="Top rated movies"
            tmdbPath="/movie/top_rated"
          />  */}
        </View>
      </View>
    </NavProvider>
  );
}

const container = document.getElementById("root");
if (container instanceof HTMLCanvasElement) {
  render(<App />, container, {
    width: 1080,
    backgroundColor: "#f1f1f1",
  });
}
