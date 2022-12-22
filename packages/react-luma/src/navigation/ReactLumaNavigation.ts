// Spatial navigation is heavily inspired by the great js-spatial-navigation
// library by Luke Chang (Mozilla), licensed under Mozilla Public License 2.0.
// Check out the original source code here: https://github.com/luke-chang/js-spatial-navigation

import type { ReactLumaElement } from "../ReactLumaElement";

export type Direction = "left" | "right" | "up" | "down";

type Rect = {
  element: ReactLumaElement;
  left: number;
  right: number;
  top: number;
  bottom: number;
};

type PartitionGroups = [
  Rect[],
  Rect[],
  Rect[],
  Rect[],
  Rect[],
  Rect[],
  Rect[],
  Rect[],
  Rect[]
];

type DistanceFunction = (rect: Rect) => number;

type DistanceFunctions = {
  nearPlumbLineIsBetter: DistanceFunction;
  nearHorizonIsBetter: DistanceFunction;
  nearTargetLeftIsBetter: DistanceFunction;
  nearTargetTopIsBetter: DistanceFunction;
  topIsBetter: DistanceFunction;
  bottomIsBetter: DistanceFunction;
  leftIsBetter: DistanceFunction;
  rightIsBetter: DistanceFunction;
};

type Priority = {
  group: Rect[];
  distance: DistanceFunction[];
};

function clamp(value: number, min: number = 0) {
  return value < min ? min : value;
}

function partitionGroups(rects: Rect[], targetRect: Rect, threshold: number) {
  const groups: PartitionGroups = [[], [], [], [], [], [], [], [], []];

  const targetDimensions = getDimensions(targetRect);

  for (let i = 0; i < rects.length; i++) {
    const rect = rects[i];
    const center = getCenter(rect);

    let x: number;
    let y: number;

    if (center.left < targetRect.left) {
      x = 0;
    } else if (center.left <= targetRect.right) {
      x = 1;
    } else {
      x = 2;
    }

    if (center.top < targetRect.top) {
      y = 0;
    } else if (center.top <= targetRect.bottom) {
      y = 1;
    } else {
      y = 2;
    }

    const groupId = y * 3 + x;
    groups[groupId].push(rect);

    if ([0, 2, 6, 8].indexOf(groupId) !== -1) {
      if (rect.left <= targetRect.right - targetDimensions.width * threshold) {
        if (groupId === 2) {
          groups[1].push(rect);
        } else if (groupId === 8) {
          groups[7].push(rect);
        }
      }

      if (rect.right >= targetRect.left + targetDimensions.width * threshold) {
        if (groupId === 0) {
          groups[1].push(rect);
        } else if (groupId === 6) {
          groups[7].push(rect);
        }
      }

      if (rect.top <= targetRect.bottom - targetDimensions.height * threshold) {
        if (groupId === 6) {
          groups[3].push(rect);
        } else if (groupId === 8) {
          groups[5].push(rect);
        }
      }

      if (rect.bottom >= targetRect.top + targetDimensions.height * threshold) {
        if (groupId === 0) {
          groups[3].push(rect);
        } else if (groupId === 2) {
          groups[5].push(rect);
        }
      }
    }
  }

  return groups;
}

function getPriorities(
  direction: Direction,
  groups: PartitionGroups,
  internalGroups: PartitionGroups,
  distanceFunctions: DistanceFunctions
): Priority[] {
  if (direction === "left") {
    return [
      {
        group: internalGroups[0]
          .concat(internalGroups[3])
          .concat(internalGroups[6]),
        distance: [
          distanceFunctions.nearPlumbLineIsBetter,
          distanceFunctions.topIsBetter,
        ],
      },
      {
        group: groups[3],
        distance: [
          distanceFunctions.nearPlumbLineIsBetter,
          distanceFunctions.topIsBetter,
        ],
      },
      {
        group: groups[0].concat(groups[6]),
        distance: [
          distanceFunctions.nearHorizonIsBetter,
          distanceFunctions.rightIsBetter,
          distanceFunctions.nearTargetTopIsBetter,
        ],
      },
    ];
  }

  if (direction === "right") {
    return [
      {
        group: internalGroups[2]
          .concat(internalGroups[5])
          .concat(internalGroups[8]),
        distance: [
          distanceFunctions.nearPlumbLineIsBetter,
          distanceFunctions.topIsBetter,
        ],
      },
      {
        group: groups[5],
        distance: [
          distanceFunctions.nearPlumbLineIsBetter,
          distanceFunctions.topIsBetter,
        ],
      },
      {
        group: groups[2].concat(groups[8]),
        distance: [
          distanceFunctions.nearHorizonIsBetter,
          distanceFunctions.leftIsBetter,
          distanceFunctions.nearTargetTopIsBetter,
        ],
      },
    ];
  }

  if (direction === "up") {
    return [
      {
        group: internalGroups[0]
          .concat(internalGroups[1])
          .concat(internalGroups[2]),
        distance: [
          distanceFunctions.nearHorizonIsBetter,
          distanceFunctions.leftIsBetter,
        ],
      },
      {
        group: groups[1],
        distance: [
          distanceFunctions.nearHorizonIsBetter,
          distanceFunctions.leftIsBetter,
        ],
      },
      {
        group: groups[0].concat(groups[2]),
        distance: [
          distanceFunctions.nearPlumbLineIsBetter,
          distanceFunctions.bottomIsBetter,
          distanceFunctions.nearTargetLeftIsBetter,
        ],
      },
    ];
  }

  if (direction === "down") {
    return [
      {
        group: internalGroups[6]
          .concat(internalGroups[7])
          .concat(internalGroups[8]),
        distance: [
          distanceFunctions.nearHorizonIsBetter,
          distanceFunctions.leftIsBetter,
        ],
      },
      {
        group: groups[7],
        distance: [
          distanceFunctions.nearHorizonIsBetter,
          distanceFunctions.leftIsBetter,
        ],
      },
      {
        group: groups[6].concat(groups[8]),
        distance: [
          distanceFunctions.nearPlumbLineIsBetter,
          distanceFunctions.topIsBetter,
          distanceFunctions.nearTargetLeftIsBetter,
        ],
      },
    ];
  }

  throw new Error(`Invalid direction "${direction}"`);
}

function prioritize(priorities: Priority[]): Rect[] | null {
  let destPriority: Priority | null = null;
  for (let priority of priorities) {
    if (priority.group.length) {
      destPriority = priority;
      break;
    }
  }

  if (!destPriority) {
    return null;
  }

  const destDistance = destPriority.distance;

  destPriority.group.sort((a, b) => {
    for (let distance of destDistance) {
      const delta = distance(a) - distance(b);
      if (delta) {
        return delta;
      }
    }
    return 0;
  });

  return destPriority.group;
}

function getDimensions(rect: Rect) {
  return {
    width: rect.right - rect.left,
    height: rect.bottom - rect.top,
  };
}

function getCenter(rect: Rect): Rect {
  const dimensions = getDimensions(rect);
  const left = rect.left + Math.floor(dimensions.width / 2);
  const top = rect.top + Math.floor(dimensions.height / 2);
  return {
    element: rect.element,
    left,
    top,
    right: left,
    bottom: top,
  };
}

function getRect(element: ReactLumaElement): Rect {
  const globalPosition = element.getGlobalPosition();
  return {
    element,
    left: globalPosition.x,
    right: globalPosition.x + element.width,
    top: globalPosition.y,
    bottom: globalPosition.y + element.height,
  };
}

function exclude(
  elements: ReactLumaElement[],
  excludedElements: ReactLumaElement[]
) {
  for (let i = 0, index; i < excludedElements.length; i++) {
    index = elements.indexOf(excludedElements[i]);
    if (index >= 0) {
      elements.splice(index, 1);
    }
  }
  return elements;
}

function navigate(
  target: ReactLumaElement,
  direction: Direction,
  candidates: ReactLumaElement[]
) {
  const candidateRects = candidates.map(getRect);
  const targetRect = getRect(target);

  const distanceFunctions = generateDistanceFunctions(targetRect);

  const straightOverlapThreshold = 0.5;
  const groups = partitionGroups(
    candidateRects,
    targetRect,
    straightOverlapThreshold
  );

  const internalGroups = partitionGroups(
    groups[4],
    getCenter(targetRect),
    straightOverlapThreshold
  );

  const priorities = getPriorities(
    direction,
    groups,
    internalGroups,
    distanceFunctions
  );

  // TODO: Straight line only.
  // priorities.pop();

  const group = prioritize(priorities);
  if (!group) {
    return null;
  }

  return group[0].element;
}

function generateDistanceFunctions(targetRect: Rect): DistanceFunctions {
  const targetCenter = getCenter(targetRect);

  const nearPlumbLineIsBetter = (rect: Rect) => {
    const center = getCenter(rect);
    if (center.left < targetCenter.left) {
      return clamp(targetCenter.left - rect.right);
    }
    return clamp(rect.left - targetCenter.left);
  };

  const nearHorizonIsBetter = (rect: Rect) => {
    const center = getCenter(rect);
    if (center.top < targetCenter.top) {
      return clamp(targetCenter.top - rect.bottom);
    }
    return clamp(rect.top - targetCenter.top);
  };

  const nearTargetLeftIsBetter = (rect: Rect) => {
    const center = getCenter(rect);
    if (center.left < targetCenter.left) {
      return clamp(targetRect.left - rect.right);
    }
    return clamp(rect.left - targetRect.left);
  };

  const nearTargetTopIsBetter = (rect: Rect) => {
    const center = getCenter(rect);
    if (center.left < targetCenter.left) {
      return clamp(targetRect.top - rect.bottom);
    }
    return clamp(rect.top - targetRect.top);
  };

  const topIsBetter = (rect: Rect) => {
    return rect.top;
  };

  const bottomIsBetter = (rect: Rect) => {
    return -1 * rect.bottom;
  };

  const leftIsBetter = (rect: Rect) => {
    return rect.left;
  };

  const rightIsBetter = (rect: Rect) => {
    return -1 * rect.right;
  };

  return {
    nearPlumbLineIsBetter,
    nearHorizonIsBetter,
    nearTargetLeftIsBetter,
    nearTargetTopIsBetter,
    topIsBetter,
    bottomIsBetter,
    leftIsBetter,
    rightIsBetter,
  };
}

export function createManager() {
  const sections: {
    [sectionId: string]: {
      elements: Set<ReactLumaElement>;
    };
  } = {};

  const getSectionId = (element: ReactLumaElement) => {
    for (let sectionId in sections) {
      if (sections[sectionId].elements.has(element)) {
        return sectionId;
      }
    }
    throw new Error("Section id not found for element.");
  };

  const addElement = (sectionId: string, element: ReactLumaElement) => {
    if (!sections[sectionId]) {
      sections[sectionId] = {
        elements: new Set(),
      };
    }
    sections[sectionId].elements.add(element);
  };

  const removeElement = (element: ReactLumaElement) => {
    const sectionId = getSectionId(element);
    if (sectionId) {
      sections[sectionId].elements.delete(element);
    }
  };

  const getSectionElements = (sectionId: string) => {
    if (!sections[sectionId]) {
      return [];
    }
    return Array.from(sections[sectionId].elements);
  };

  const getSectionDefaultElement = (sectionId: string) => {
    return null;
  };

  const getSectionLastFocusedElement = (sectionId: string) => {
    return null;
  };

  const getNextInSection = (sectionId: string) => {
    const range: {
      [id: string]: boolean;
    } = {};

    if (sectionId) {
      range[sectionId] = true;
    }

    for (let id in range) {
      const next =
        getSectionDefaultElement(id) ||
        getSectionLastFocusedElement(id) ||
        getSectionElements(id)[0];

      if (next) {
        return next;
      }
    }

    return null;
  };

  const getNext = (
    direction: Direction,
    currentFocusedElement: ReactLumaElement
  ) => {
    const sectionElements: {
      [sectionId: string]: ReactLumaElement[];
    } = {};
    const allElements: ReactLumaElement[] = [];
    for (let id in sections) {
      sectionElements[id] = getSectionElements(id);
      allElements.push(...sectionElements[id]);
    }

    let next: ReactLumaElement | null = null;

    const currentSectionId = getSectionId(currentFocusedElement);
    const currentSectionElements = sectionElements[currentSectionId];

    next = navigate(
      currentFocusedElement,
      direction,
      exclude(currentSectionElements, [currentFocusedElement])
    );

    if (!next) {
      next = navigate(
        currentFocusedElement,
        direction,
        exclude(allElements, currentSectionElements)
      );
    }

    return next;
  };

  return {
    addElement,
    removeElement,
    getNext,
    getNextInSection,
    getSectionId,
  };
}

export type Manager = ReturnType<typeof createManager>;
