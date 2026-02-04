# Plan: Merged Phase 3 (Independent Deployment)

This plan outlines the steps to create a new, standalone Phase 3 directory (`phase3-merged`) that combines the full-stack web capabilities of Phase 2 with the AI Chatbot features of Phase 3, without modifying any existing phase directories.

## 1. Directory Setup
- Create a new root-level directory: `phase3-merged/`.
- Copy all files and folders from `phase2-fullstack-web/` into `phase3-merged/`.

## 2. Backend Integration
- **Models**: Copy `phase3-ai-chatbot/backend/src/models/conversation.py` and `message.py` to `phase3-merged/backend/src/models/`.
- **Services**: Copy `phase3-ai-chatbot/backend/src/services/chat_service.py` to `phase3-merged/backend/src/services/`.
- **API Routes**: Copy `phase3-ai-chatbot/backend/src/api/chat.py` to `phase3-merged/backend/src/api/`.
- **AI Agent**: Copy the entire `phase3-ai-chatbot/backend/src/agent/` directory to `phase3-merged/backend/src/agent/`.
- **MCP Server**: Copy the entire `phase3-ai-chatbot/backend/src/mcp/` directory to `phase3-merged/backend/src/mcp/`.
- **Main Setup**: Modify `phase3-merged/backend/src/main.py` to:
    - Import the `chat` router.
    - Register the chat router: `app.include_router(chat.router, prefix="/api", tags=["chat"])`.

## 3. Frontend Integration
- **Pages**: Copy `phase3-ai-chatbot/frontend/app/chat/` to `phase3-merged/frontend/app/chat/`.
- **Components**: Copy `phase3-ai-chatbot/frontend/components/chat/` to `phase3-merged/frontend/components/chat/`.
- **API Client**: Copy `phase3-ai-chatbot/frontend/lib/chat-api.ts` to `phase3-merged/frontend/lib/`.
- **Context & Hooks**:
    - Copy `phase3-ai-chatbot/frontend/lib/context/ChatContext.tsx` to `phase3-merged/frontend/lib/context/`.
    - Copy `phase3-ai-chatbot/frontend/lib/hooks/useChatMessages.ts` and `useConversations.ts` to `phase3-merged/frontend/lib/hooks/`.

## 4. Dependencies & Environment
- **Backend Dependencies**: Ensure `openai`, `mcp`, and `openai-agents` (or equivalent SDKs used in Phase 3) are added to the backend's environment.
- **Environment Variables**:
    - Ensure `phase3-merged/backend/.env` contains `OPENAI_API_KEY`.
    - Ensure `phase3-merged/frontend/.env.local` contains any required keys for ChatKit if applicable.

## 5. Verification
- Run the merged backend and verify the `/api/chat` endpoint is available.
- Run the merged frontend and verify the `/chat` page renders and connects to the backend.

## 6. Constraints Adherence
- **Independence**: `phase3-merged` will be a fully functional, self-contained clone with additional features.
- **Safety**: No files in `phase1-*`, `phase2-*`, or the current `phase3-ai-chatbot` will be touched.
