import { useState, useEffect, useRef, forwardRef } from "react";
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

const Swimlane = forwardRef((props: SwimlaneProps, forwardedRef) => {
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
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setItems(data.results);
    };
    fetchData();
  }, [props.tmdbPath]);

  const nav = useNavigation();

  const [left, setLeft] = useState(0);
  useEffect(() => {
    if (nav.focusedElement && containerRef.current) {
      const sectionId = nav.manager.getSectionId(nav.focusedElement);
      if (sectionId === props.id) {
        const delta =
          containerRef.current.displayObject.getBounds().left -
          nav.focusedElement.displayObject.getBounds().left;
        setLeft(delta);
      }
    }
  }, [props.id, nav.focusedElement]);

  return (
    <View ref={forwardedRef} style={{ marginBottom: 12 }}>
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
                  style={{
                    width: 110,
                    height: 160,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
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
});

function Swimlanes() {
  const nav = useNavigation();

  const containerRef = useRef<ReactLumaElement>();
  const itemsRef = useRef<{
    [id: string]: ReactLumaElement;
  }>({});
  const [top, setTop] = useState(0);

  useEffect(() => {
    if (!nav.focusedElement || !containerRef.current) {
      return;
    }
    const id = nav.manager.getSectionId(nav.focusedElement);
    const lane = itemsRef.current[id];
    if (!lane) {
      return;
    }
    const delta =
      containerRef.current.displayObject.getGlobalPosition().y -
      lane.displayObject.getGlobalPosition().y;

    // TODO: We should not count transform as position.
    setTop(delta + 212);
  }, [nav.focusedElement]);

  return (
    <View ref={containerRef} style={{ marginLeft: 12 }} transform={{ top }}>
      <Swimlane
        ref={(el) => {
          itemsRef.current["swimlane_top_movies"] = el;
        }}
        id="swimlane_top_movies"
        title="Top movies"
        tmdbPath="/movie/popular"
      />
      <Swimlane
        ref={(el) => {
          itemsRef.current["swimlane_popular_tv"] = el;
        }}
        id="swimlane_popular_tv"
        title="Top on TV"
        tmdbPath="/tv/popular"
      />
      <Swimlane
        ref={(el) => {
          itemsRef.current["swimlane_upcoming_movies"] = el;
        }}
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
        <View style={{ flexDirection: "column" }}>
          <View style={{ height: 200 }} />
          <Swimlanes />
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
