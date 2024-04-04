import { Question } from "@/types/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function areArraysEqual(arr1: Question[], arr2: Question[]): boolean {
  if (arr1.length !== arr2.length) {
      return false;
  }

  for (let i = 0; i < arr1.length; i++) {
      const obj1 = arr1[i];
      const obj2 = arr2[i];

      if (!isObjectEqual(obj1, obj2)) {
          return false;
      }
  }

  return true;
}

function isObjectEqual(obj1: Question, obj2: Question): boolean {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (obj1[key as keyof Question] !== obj2[key as keyof Question]) {
        return false;
      }
    }

  return true;
}