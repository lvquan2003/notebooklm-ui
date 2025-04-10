"use client"

import { useState } from "react"
import NotebookHeader from "./notebook-header"
import SourceTab from "./tabs/source-tab"
import ConversationTab from "./tabs/conversation-tab"
import StudioTab from "./tabs/studio-tab"
import { Button } from "@/components/ui/button"
import { PanelLeft, PanelRight } from "lucide-react"

export default function NotebookLayout() {
  const [activeTab, setActiveTab] = useState<"source" | "conversation" | "studio">("conversation")
  const [collapsedTabs, setCollapsedTabs] = useState<{
    source: boolean
    studio: boolean
  }>({
    source: false,
    studio: false,
  })

  const toggleTab = (tab: "source" | "studio") => {
    setCollapsedTabs((prev) => ({
      ...prev,
      [tab]: !prev[tab],
    }))
  }

  // Calculate widths based on which tabs are collapsed
  const getTabWidths = () => {
    const collapsedWidth = 60 // Width of collapsed tab in pixels
    const gapWidth = 8 // Gap between tabs in pixels

    // Both side tabs collapsed
    if (collapsedTabs.source && collapsedTabs.studio) {
      return {
        sourceWidth: `${collapsedWidth}px`,
        conversationWidth: `calc(100% - ${2 * collapsedWidth + 2 * gapWidth}px)`,
        studioWidth: `${collapsedWidth}px`,
      }
    }

    // Source collapsed, Studio expanded
    if (collapsedTabs.source && !collapsedTabs.studio) {
      return {
        sourceWidth: `${collapsedWidth}px`,
        conversationWidth: `calc(50% - ${collapsedWidth / 2 + gapWidth}px)`,
        studioWidth: `calc(50% - ${collapsedWidth / 2 + gapWidth}px)`,
      }
    }

    // Source expanded, Studio collapsed
    if (!collapsedTabs.source && collapsedTabs.studio) {
      return {
        sourceWidth: `calc(50% - ${collapsedWidth / 2 + gapWidth}px)`,
        conversationWidth: `calc(50% - ${collapsedWidth / 2 + gapWidth}px)`,
        studioWidth: `${collapsedWidth}px`,
      }
    }

    // Both expanded (default)
    return {
      sourceWidth: "calc(33.333% - 8px)",
      conversationWidth: "calc(33.333% - 8px)",
      studioWidth: "calc(33.333% - 8px)",
    }
  }

  const { sourceWidth, conversationWidth, studioWidth } = getTabWidths()

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <NotebookHeader />

      <div className="flex flex-1 overflow-hidden bg-inherit p-2 gap-2">
        {/* Source Tab */}
        <div
          className={`bg-white rounded-lg shadow-sm flex flex-col ${
            activeTab === "source" ? "block" : "hidden md:flex"
          }`}
          style={{
            width: sourceWidth,
            minWidth: collapsedTabs.source ? "60px" : "200px",
            transition: "width 0.3s ease-in-out",
          }}
        >
          <div className="flex items-center justify-between p-4 border-b">
            {!collapsedTabs.source && <h2 className="text-lg font-medium">Nguồn</h2>}
            <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto" onClick={() => toggleTab("source")}>
              <PanelLeft />
            </Button>
          </div>
          {!collapsedTabs.source && <SourceTab />}
        </div>

        {/* Conversation Tab - No collapse button */}
        <div
          className={`bg-white rounded-lg shadow-sm flex flex-col ${
            activeTab === "conversation" ? "block" : "hidden md:flex"
          }`}
          style={{
            width: conversationWidth,
            minWidth: "200px",
            transition: "width 0.3s ease-in-out",
          }}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-medium h-8">Cuộc trò chuyện</h2>
          </div>
          <ConversationTab />
        </div>

        {/* Studio Tab */}
        <div
          className={`bg-white rounded-lg shadow-sm flex flex-col ${
            activeTab === "studio" ? "block" : "hidden md:flex"
          }`}
          style={{
            width: studioWidth,
            minWidth: collapsedTabs.studio ? "60px" : "200px",
            transition: "width 0.3s ease-in-out",
          }}
        >
          <div className="flex items-center justify-between p-4 border-b">
            {!collapsedTabs.studio && <h2 className="text-lg font-medium">Studio</h2>}
            <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto" onClick={() => toggleTab("studio")}>
              <PanelRight />
            </Button>
          </div>
          {!collapsedTabs.studio && <StudioTab />}
        </div>
      </div>

      {/* Mobile tab switcher */}
      <div className="md:hidden flex border-t bg-white">
        <button
          className={`flex-1 p-3 text-center ${activeTab === "source" ? "bg-accent/20" : ""}`}
          onClick={() => setActiveTab("source")}
        >
          Nguồn
        </button>
        <button
          className={`flex-1 p-3 text-center ${activeTab === "conversation" ? "bg-accent/20" : ""}`}
          onClick={() => setActiveTab("conversation")}
        >
          Cuộc trò chuyện
        </button>
        <button
          className={`flex-1 p-3 text-center ${activeTab === "studio" ? "bg-accent/20" : ""}`}
          onClick={() => setActiveTab("studio")}
        >
          Studio
        </button>
      </div>
    </div>
  )
}
