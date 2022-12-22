import { useState, useEffect, useRef, forwardRef, useMemo } from "react";
import {
  render,
  View,
  Text,
  Sprite,
  Image,
  TEXTURE_WHITE,
  useMultiRef,
} from "react-luma";
import {
  NavProvider,
  FocusSection,
  Focusable,
  useNav,
} from "react-luma/navigation";
import { ReactLumaElement } from "react-luma";

const TMDB_API_KEY = "fbba46e1c3147f982c3b7d32995add6b";

const swimlanesData = [
  {
    id: "swimlane_top_movies",
    title: "Top movies",
    tmdbPath: "/movie/popular",
  },
  {
    id: "swimlane_popular_tv",
    title: "Top on TV",
    tmdbPath: "/tv/popular",
  },
  {
    id: "swimlane_upcoming_movies",
    title: "Upcoming movies",
    tmdbPath: "/movie/upcoming",
  },
];

function useFetchData<T>(url: string) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [url]);

  return data;
}

type SwimlaneProps = {
  index: number;
  id: string;
  title: string;
  tmdbPath: string;
};

const Swimlane = forwardRef<ReactLumaElement, SwimlaneProps>(
  (props, forwardedRef) => {
    const { focused } = useNav();
    const containerRef = useRef<ReactLumaElement | undefined>();
    const data = useFetchData<{
      results: {
        id: string;
        poster_path: string;
      }[];
    }>(`https://api.themoviedb.org/3${props.tmdbPath}?api_key=${TMDB_API_KEY}`);

    const scopedFocused =
      focused && focused.sectionId === props.id ? focused : null;

    const xRef = useRef<number>(0);
    const x = useMemo(() => {
      if (scopedFocused) {
        xRef.current =
          containerRef.current!.getGlobalPosition().x -
          scopedFocused.element.getGlobalPosition().x;
      }
      return xRef.current;
    }, [scopedFocused]);

    return (
      <View ref={forwardedRef} style={{ marginBottom: 12 }}>
        <Text style={{ marginBottom: 6 }} text={props.title} />
        {!!data && (
          <FocusSection id={props.id}>
            <View
              ref={containerRef}
              style={{ flexDirection: "row" }}
              transform={{ x }}
            >
              {data.results.map((item, itemIndex) => (
                <Focusable
                  key={item.id}
                  unstable_focusOnMount={props.index === 0 && itemIndex === 0}
                >
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
        )}
      </View>
    );
  }
);

function Swimlanes() {
  const { focused } = useNav();
  const containerRef = useRef<ReactLumaElement>();
  const [swimlaneElements, registerSwimlaneElement] =
    useMultiRef<ReactLumaElement>();

  const y = useMemo(() => {
    if (!focused) {
      return 0;
    }
    const swimlaneElement = swimlaneElements[focused.sectionId];
    if (!swimlaneElement) {
      return 0;
    }
    return (
      containerRef.current!.getGlobalPosition().y -
      swimlaneElement.getGlobalPosition().y
    );
  }, [focused]);

  return (
    <View ref={containerRef} style={{ marginLeft: 12 }} transform={{ y }}>
      {swimlanesData.map((data, index) => (
        <Swimlane
          index={index}
          key={data.id}
          ref={registerSwimlaneElement(data.id)}
          id={data.id}
          title={data.title}
          tmdbPath={data.tmdbPath}
        />
      ))}
    </View>
  );
}

function App() {
  return (
    <NavProvider>
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
  });
}
