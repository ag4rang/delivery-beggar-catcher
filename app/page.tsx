"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type ReactNode,
} from "react";
import {
  Camera,
  ChevronRight,
  Database,
  FileText,
  FolderClosed,
  Home,
  Images,
  Menu,
  Radio,
  Search,
  Shield,
  ShieldCheck,
  Store,
  Users,
  UsersRound,
  X,
  Zap,
} from "lucide-react";

type NavKey = "home" | "cases" | "match" | "store";

const NAV_ITEMS: { key: NavKey; label: string; icon: typeof Home }[] = [
  { key: "home", label: "홈", icon: Home },
  { key: "cases", label: "내 사건", icon: FolderClosed },
  { key: "match", label: "피해매칭", icon: UsersRound },
  { key: "store", label: "내 매장", icon: Store },
];

const MENU_ITEMS = ["내 매장 보호 현황", "블랙리스트 피드", "이용 요금제", "고객센터"];

export default function HomePage() {
  const inputId = useId();
  const previewUrlRef = useRef<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState<NavKey>("home");

  const assignFile = useCallback((file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) return;
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    const url = URL.createObjectURL(file);
    previewUrlRef.current = url;
    setPreviewUrl(url);
    setFileName(file.name);
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    assignFile(event.target.files?.[0]);
  }

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    assignFile(event.dataTransfer.files?.[0]);
  }

  function onDragLeave(event: DragEvent<HTMLLabelElement>) {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
    setDragging(false);
  }

  return (
    <div className="min-h-dvh bg-[#07090f]">
      <div className="relative mx-auto flex min-h-dvh max-w-[430px] flex-col overflow-hidden bg-[#0B0F17] shadow-[0_0_80px_rgba(0,0,0,0.45)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_8%,rgba(37,99,235,0.28),transparent_32%),radial-gradient(circle_at_8%_0%,rgba(14,165,233,0.14),transparent_28%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[280px] opacity-[0.14] [background-image:linear-gradient(rgba(125,211,252,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.4)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />

        <header className="relative z-20 flex items-center gap-1.5 px-3.5 pt-3.5 pb-2">
          <div className="flex shrink-0 items-center gap-1.5">
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] bg-gradient-to-br from-[#2563eb] to-[#0ea5e9] shadow-[0_0_14px_rgba(14,165,233,0.5)]">
              <ShieldCheck className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <div className="leading-none">
              <p className="text-[14.5px] font-extrabold tracking-tight text-white">배달가드</p>
              <p className="mt-[3px] text-[7.5px] font-semibold tracking-[0.12em] text-sky-300/90">
                DeliveryGuard
              </p>
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <p className="hidden truncate text-[9px] font-medium text-slate-400 min-[415px]:block">
              사장님의 오늘도, 안전한 배달
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1 rounded-full border border-emerald-400/35 bg-emerald-500/10 px-1.5 py-[4px]">
            <span className="live-dot h-[6px] w-[6px] rounded-full bg-emerald-400" />
            <span className="text-[8.5px] font-semibold whitespace-nowrap text-emerald-300">
              실시간 블랙리스트 감지 중
            </span>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="-mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-200 active:bg-white/5"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </header>

        {menuOpen ? (
          <nav className="relative z-20 mx-3.5 mb-2 overflow-hidden rounded-2xl border border-white/10 bg-[#121826]/95 backdrop-blur">
            {MENU_ITEMS.map((item) => (
              <button
                key={item}
                type="button"
                className="flex w-full items-center justify-between border-b border-white/5 px-3.5 py-2.5 text-[13px] text-slate-200 last:border-b-0"
              >
                {item}
                <ChevronRight className="h-4 w-4 text-slate-500" />
              </button>
            ))}
          </nav>
        ) : null}

        <main className="relative z-10 flex-1 px-3.5 pb-3">
          <section className="relative pt-1">
            <h1 className="pr-[104px] text-[22px] leading-[1.3] font-extrabold tracking-[-0.03em] text-white">
              배달 이물질·상습 환불 사기,
              <br />
              <span className="text-[#5FA8FF]">3초 포렌식 검증</span>
            </h1>
            <p className="mt-2 text-[11.5px] leading-5 tracking-[-0.01em] text-slate-300">
              사진 한 장으로 도용·과거 사진 재탕·합성을 즉시 적발합니다.
            </p>

            <div aria-hidden className="absolute top-0 right-0 flex items-start gap-1">
              <div className="relative">
                <Shield
                  className="h-[70px] w-[70px] text-sky-400/65 drop-shadow-[0_0_18px_rgba(56,189,248,0.5)]"
                  strokeWidth={1.15}
                />
                <ShieldCheck
                  className="absolute inset-0 m-auto h-7 w-7 text-sky-100"
                  strokeWidth={2.2}
                />
              </div>
              <p className="mt-3.5 text-[8px] leading-[1.55] font-medium text-sky-200/75">
                가짜는
                <br />
                언제나
                <br />
                흔적을
                <br />
                남깁니다.
              </p>
            </div>
          </section>

          <label
            htmlFor={inputId}
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`relative mt-4 block cursor-pointer rounded-[22px] border-2 border-dashed px-3.5 pt-5 pb-3.5 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-sky-300 ${
              dragging
                ? "border-sky-300 bg-sky-500/15 shadow-[0_0_28px_rgba(56,189,248,0.28)]"
                : "border-sky-400/55 bg-[#0C1524]/85 shadow-[0_0_24px_rgba(14,165,233,0.12)_inset]"
            }`}
          >
            <input
              id={inputId}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={onInputChange}
            />

            <span className="absolute top-3.5 right-3.5 text-right text-[8px] leading-[1.55] font-semibold tracking-[0.04em] text-slate-400">
              DRAG &amp; DROP
              <br />
              <span className="font-medium tracking-normal text-slate-500">또는</span>
              <br />
              <span className="font-medium tracking-normal text-slate-500">여기를 탭하세요</span>
            </span>

            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="업로드한 환불 사진 미리보기"
                className="mx-auto mb-3.5 h-[92px] w-full rounded-xl object-cover"
              />
            ) : (
              <span aria-hidden className="mb-3.5 flex items-end justify-center gap-1.5 text-sky-200">
                <Camera className="h-11 w-11" strokeWidth={1.55} />
                <Images className="mb-0.5 h-10 w-10" strokeWidth={1.55} />
              </span>
            )}

            <span className="flex w-full items-center justify-center gap-1 rounded-full bg-gradient-to-r from-[#1a78ff] to-[#3aa2ff] py-[13px] text-[15px] font-bold text-white shadow-[0_8px_24px_rgba(37,99,235,0.4)]">
              의심되는 환불 사진 등록하기
              <ChevronRight className="h-4 w-4" />
            </span>

            <span className="mt-3 block text-center text-[9.5px] leading-4 text-slate-400">
              {fileName
                ? `선택됨: ${fileName}`
                : "카톡 캡처본 / 배달앱 접수 사진 모두 지원 (EXIF 메타데이터 자동 추출)"}
            </span>
          </label>

          <section
            aria-label="검증 진행 단계"
            className="mt-3.5 grid grid-cols-[1fr_12px_1fr_12px_1fr] items-stretch"
          >
            <PipelineCard
              step={1}
              state="done"
              status="완료"
              icon={<FileText className="h-[25px] w-[25px] text-slate-100" strokeWidth={1.5} />}
              title="1단계"
              lines={["원본 촬영 일시·기종", "메타데이터 분석", "(무료)"]}
            />
            <StepArrow />
            <PipelineCard
              step={2}
              state="active"
              status="분석 중"
              icon={<Database className="h-[25px] w-[25px] text-sky-200" strokeWidth={1.5} />}
              title="2단계"
              lines={["전국 매장 14만 건", "사기 사진 지문(pHash)", "대조"]}
            />
            <StepArrow />
            <PipelineCard
              step={3}
              state="waiting"
              status="대기중"
              icon={<Search className="h-[25px] w-[25px] text-slate-300" strokeWidth={1.5} />}
              title="3단계"
              lines={["구글 렌즈 기반", "웹 원본 도용 역추적"]}
            />
          </section>

          <section className="mt-3.5 rounded-2xl border border-white/10 bg-[#111A28] px-3 py-3">
            <div className="mb-2.5 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Radio className="h-4 w-4 text-sky-300" />
                <h2 className="text-[13px] font-bold text-white">실시간 커뮤니티 제보 현황</h2>
              </div>
              <button
                type="button"
                className="flex items-center text-[10.5px] font-medium text-slate-400"
              >
                더보기
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="shrink-0 self-start rounded bg-slate-700/70 px-1.5 py-[3px] text-[9px] font-medium text-slate-300">
                방금 전
              </span>
              <p className="flex-1 text-[11px] leading-[1.5] tracking-[-0.01em] text-slate-200">
                <b className="font-bold text-white">역삼동 치킨집</b>에서 재사용한 치킨 뼈 사진 (3년
                전 네이버 블로그 도용)이 적발되었습니다.
              </p>
              <div className="flex shrink-0 items-center gap-1.5 rounded-xl border border-white/10 bg-[#0E1626] px-2 py-1.5">
                <Users className="h-4 w-4 text-sky-200" strokeWidth={1.8} />
                <span className="leading-none">
                  <span className="block text-[8px] text-slate-400">오늘 추가 제보</span>
                  <span className="mt-0.5 block text-[13px] font-extrabold text-sky-300">+12건</span>
                </span>
              </div>
            </div>
          </section>

          <section className="mt-3.5 grid grid-cols-4 gap-1">
            <Stat
              icon={<Shield className="h-4 w-4" strokeWidth={1.8} />}
              label={"14만 건\n사기 이미지 DB"}
            />
            <Stat
              icon={<Zap className="h-4 w-4" strokeWidth={1.8} />}
              label={"3초 내\n신속한 분석"}
            />
            <Stat
              icon={<FileText className="h-4 w-4" strokeWidth={1.8} />}
              label={"플랫폼 소명 자료\n자동 생성"}
            />
            <Stat
              icon={<UsersRound className="h-4 w-4" strokeWidth={1.8} />}
              label={"동일 피해 점주\n커뮤니티"}
            />
          </section>
        </main>

        <div className="sticky bottom-0 z-30 bg-[#0B0F17]/95 px-3.5 pt-2 pb-[max(env(safe-area-inset-bottom),8px)] backdrop-blur">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-1.5 rounded-[14px] bg-gradient-to-r from-[#1577ff] to-[#3aa2ff] py-3.5 text-[13.5px] font-extrabold text-white shadow-[0_10px_28px_rgba(37,99,235,0.4)] active:scale-[0.995]"
          >
            <ShieldCheck className="h-[18px] w-[18px]" strokeWidth={2.2} />
            내 매장 즉시 보호하기 <span className="font-semibold">(월 4,900원 보험 플랜)</span>
            <ChevronRight className="h-4 w-4" />
          </button>

          <nav className="mt-1.5 grid grid-cols-4 border-t border-white/5 pt-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = activeNav === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  aria-current={active ? "page" : undefined}
                  onClick={() => setActiveNav(item.key)}
                  className={`flex flex-col items-center gap-1 py-1 text-[10.5px] font-medium ${
                    active ? "text-sky-300" : "text-slate-500"
                  }`}
                >
                  <Icon className="h-[19px] w-[19px]" strokeWidth={active ? 2.2 : 1.7} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}

function StepArrow() {
  return (
    <ChevronRight
      aria-hidden
      className="h-3.5 w-3.5 self-center justify-self-center text-slate-500"
    />
  );
}

function PipelineCard({
  step,
  state,
  status,
  icon,
  title,
  lines,
}: {
  step: number;
  state: "done" | "active" | "waiting";
  status: string;
  icon: ReactNode;
  title: string;
  lines: string[];
}) {
  const active = state === "active";
  const waiting = state === "waiting";

  return (
    <article
      className={`relative h-full overflow-hidden rounded-2xl border px-1.5 py-2.5 ${
        active
          ? "analyze-card border-sky-400/55 bg-[#0F2033]"
          : waiting
            ? "border-white/[0.08] bg-[#0E131C]"
            : "border-white/10 bg-[#111A28]"
      }`}
    >
      {active ? (
        <span
          aria-hidden
          className="scan-line pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-sky-300/28 to-transparent"
        />
      ) : null}

      <div className="mb-2 flex items-center justify-between gap-0.5 px-0.5">
        <span
          className={`flex h-[17px] w-[17px] items-center justify-center rounded-full text-[9.5px] font-bold ${
            waiting ? "bg-slate-600 text-slate-100" : "bg-[#2563eb] text-white"
          }`}
        >
          {step}
        </span>
        <span
          className={`flex items-center text-[9px] font-semibold ${
            active ? "text-sky-300" : waiting ? "text-slate-400" : "text-slate-200"
          }`}
        >
          {status}
          {state === "done" ? <ChevronRight className="h-3 w-3" /> : null}
          {active ? <span aria-hidden className="analyze-dots ml-[2px] w-[9px]" /> : null}
        </span>
      </div>

      <div className="mb-1.5 flex justify-center">{icon}</div>

      <p className={`text-center text-[12px] font-bold ${active ? "text-sky-300" : "text-white"}`}>
        {title}
      </p>

      <div className="mt-1 text-center text-[9px] leading-[1.45] text-slate-400">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </article>
  );
}

function Stat({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1">
      <span className="shrink-0 text-sky-200">{icon}</span>
      <p className="text-[8px] leading-[1.4] whitespace-pre-line text-slate-400">{label}</p>
    </div>
  );
}
