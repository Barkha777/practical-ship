import React, { createContext, useState, useEffect } from "react";
import { getData, saveData, getStoredAdminMode, setStoredAdminMode, exportBackupJSON, resetToDefaultData } from "../utils/storage";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(getData());
  const [isAdmin, setIsAdmin] = useState(getStoredAdminMode());
  const [globalSearch, setGlobalSearch] = useState("");

  useEffect(() => {
    saveData(data);
  }, [data]);

  useEffect(() => {
    setStoredAdminMode(isAdmin);
  }, [isAdmin]);

  const toggleAdmin = () => {
    setIsAdmin(prev => !prev);
  };

  // Helper functions for Subject CRUD
  const addSubject = (subjectObj) => {
    const newSub = {
      id: `sub-${Date.now()}`,
      name: subjectObj.name,
      code: subjectObj.code || `CS-${Math.floor(100 + Math.random() * 900)}`,
      description: subjectObj.description || "",
      color: subjectObj.color || "from-cyan-500 to-blue-600",
      practicals: []
    };
    const updated = {
      ...data,
      subjects: [...data.subjects, newSub]
    };
    setData(updated);
    return newSub.id;
  };

  const updateSubject = (subjectId, updatedFields) => {
    const updated = {
      ...data,
      subjects: data.subjects.map(s => s.id === subjectId ? { ...s, ...updatedFields } : s)
    };
    setData(updated);
  };

  const deleteSubject = (subjectId) => {
    const updated = {
      ...data,
      subjects: data.subjects.filter(s => s.id !== subjectId)
    };
    setData(updated);
  };

  // Helper functions for Practical CRUD
  const addPractical = (subjectId, practicalObj) => {
    const targetSubject = data.subjects.find(s => s.id === subjectId);
    if (!targetSubject) return;

    const practicalCount = targetSubject.practicals.length;
    const newPrac = {
      id: `prac-${Date.now()}`,
      practicalNo: practicalObj.practicalNo || practicalCount + 1,
      title: practicalObj.title || "Untitled Practical",
      shortDescription: practicalObj.shortDescription || "",
      status: practicalObj.status || "Draft",
      updatedAt: new Date().toISOString().slice(0, 10),
      sections: {
        information: practicalObj.sections?.information || "",
        procedure: practicalObj.sections?.procedure || "",
        codeSections: practicalObj.sections?.codeSections || [],
        comparisonTable: practicalObj.sections?.comparisonTable || {
          title: "Algorithm / Method Comparison",
          headers: ["Metric", "Approach A", "Approach B"],
          rows: [
            ["Time Complexity", "", ""],
            ["Space Complexity", "", ""]
          ]
        },
        conclusion: practicalObj.sections?.conclusion || ""
      }
    };

    const updated = {
      ...data,
      subjects: data.subjects.map(s => {
        if (s.id === subjectId) {
          return {
            ...s,
            practicals: [...s.practicals, newPrac]
          };
        }
        return s;
      })
    };
    setData(updated);
    return newPrac.id;
  };

  const updatePractical = (subjectId, practicalId, updatedFields) => {
    const updated = {
      ...data,
      subjects: data.subjects.map(s => {
        if (s.id === subjectId) {
          return {
            ...s,
            practicals: s.practicals.map(p => {
              if (p.id === practicalId) {
                return {
                  ...p,
                  ...updatedFields,
                  updatedAt: new Date().toISOString().slice(0, 10)
                };
              }
              return p;
            })
          };
        }
        return s;
      })
    };
    setData(updated);
  };

  const deletePractical = (subjectId, practicalId) => {
    const updated = {
      ...data,
      subjects: data.subjects.map(s => {
        if (s.id === subjectId) {
          return {
            ...s,
            practicals: s.practicals.filter(p => p.id !== practicalId)
          };
        }
        return s;
      })
    };
    setData(updated);
  };

  const exportData = () => {
    exportBackupJSON(data);
  };

  const importData = (importedData) => {
    if (importedData && Array.isArray(importedData.subjects)) {
      setData(importedData);
      return true;
    }
    return false;
  };

  const resetData = () => {
    const initial = resetToDefaultData();
    setData(initial);
  };

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        isAdmin,
        toggleAdmin,
        globalSearch,
        setGlobalSearch,
        addSubject,
        updateSubject,
        deleteSubject,
        addPractical,
        updatePractical,
        deletePractical,
        exportData,
        importData,
        resetData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
