// PowerShellコマンド データセット（Claude Codeがまとめました。100%網羅ではなく、よく使う基本コマンドが中心です）
// カテゴリ定義
const PWSH_CATEGORIES = [
  { key: "file", label: "ファイル・アイテム操作" },
  { key: "location", label: "場所・パス操作" },
  { key: "process", label: "プロセス管理" },
  { key: "service", label: "サービス管理" },
  { key: "network", label: "ネットワーク・Web" },
  { key: "registry", label: "レジストリ操作" },
  { key: "dataio", label: "データ変換・入出力" },
  { key: "variable", label: "変数操作" },
  { key: "pipeline", label: "パイプライン・オブジェクト操作" },
  { key: "format", label: "出力・書式" },
  { key: "module", label: "モジュール・パッケージ管理" },
  { key: "remoting", label: "リモート操作" },
  { key: "job", label: "バックグラウンドジョブ" },
  { key: "help", label: "ヘルプ・情報取得" },
  { key: "datetime", label: "日付・時刻" },
  { key: "security", label: "セキュリティ・権限" },
  { key: "eventlog", label: "イベントログ" },
  { key: "system", label: "システム・環境情報" },
  { key: "archive", label: "アーカイブ" },
  { key: "scripting", label: "スクリプト・言語機能" },
  { key: "alias", label: "エイリアス管理" },
  { key: "psdrive", label: "PSドライブ・プロバイダー" },
  { key: "scheduledtask", label: "タスクスケジューラ" },
  { key: "firewall", label: "ファイアウォール" },
  { key: "disk", label: "ディスク・ボリューム管理" },
  { key: "localaccount", label: "ローカルユーザー・グループ管理" },
  { key: "dnsclient", label: "DNSクライアント設定" },
  { key: "printer", label: "プリンター管理" },
  { key: "interaction", label: "ユーザー入力・対話" },
  { key: "bitlocker", label: "ドライブ暗号化 (BitLocker)" },
  { key: "hyperv", label: "Hyper-V仮想マシン" },
  { key: "winfeature", label: "Windowsの機能" },
  { key: "activedirectory", label: "Active Directory" },
  { key: "device", label: "デバイス管理" },
  { key: "debug", label: "デバッグ" },
  { key: "event", label: "イベント・トランスクリプト" }
];

const PWSH_COMMANDS = [
  // ===== file =====
  {
    id: "get-childitem", name: "Get-ChildItem", aliases: ["ls", "dir", "gci"], category: "file",
    summary: "指定した場所にあるファイルやフォルダの一覧を取得する",
    syntax: "Get-ChildItem [[-Path] <string[]>] [-Filter <string>] [-Recurse] [-Force] [-Directory] [-File]",
    parameters: [
      { name: "-Path", description: "一覧を取得する場所（省略時は現在の場所）" },
      { name: "-Filter", description: "ワイルドカードでファイル名を絞り込む（例: *.txt）" },
      { name: "-Recurse", description: "サブフォルダも含めて再帰的に取得する" },
      { name: "-Force", description: "隠しファイル・システムファイルも表示する" },
      { name: "-Directory / -File", description: "フォルダのみ／ファイルのみに絞り込む" }
    ],
    examples: [
      { command: "Get-ChildItem", description: "現在の場所にあるファイル・フォルダの一覧を表示" },
      { command: 'Get-ChildItem -Path "C:\\Users" -Directory', description: "指定フォルダ内のフォルダだけを表示" },
      { command: "Get-ChildItem -Recurse -Filter *.log", description: "サブフォルダも含めて .log ファイルを検索" }
    ],
    tags: ["ファイル一覧", "フォルダ一覧", "中身を見る", "一覧表示", "ls", "dir", "検索", "ファイルを探す"]
  },
  {
    id: "copy-item", name: "Copy-Item", aliases: ["cp", "copy"], category: "file",
    summary: "ファイルやフォルダをコピーする",
    syntax: "Copy-Item [-Path] <string[]> [-Destination] <string> [-Recurse] [-Force]",
    parameters: [
      { name: "-Path", description: "コピー元のパス" },
      { name: "-Destination", description: "コピー先のパス" },
      { name: "-Recurse", description: "フォルダの中身もすべてコピーする" },
      { name: "-Force", description: "読み取り専用ファイルなども上書きコピーする" }
    ],
    examples: [
      { command: 'Copy-Item -Path "a.txt" -Destination "backup\\a.txt"', description: "ファイルを別フォルダへコピー" },
      { command: 'Copy-Item -Path "C:\\src" -Destination "C:\\dst" -Recurse', description: "フォルダを中身ごとコピー" }
    ],
    tags: ["コピー", "複製", "ファイルをコピー", "フォルダをコピー", "バックアップ"]
  },
  {
    id: "move-item", name: "Move-Item", aliases: ["mv", "move"], category: "file",
    summary: "ファイルやフォルダを移動（名前変更を含む）する",
    syntax: "Move-Item [-Path] <string[]> [-Destination] <string> [-Force]",
    parameters: [
      { name: "-Path", description: "移動元のパス" },
      { name: "-Destination", description: "移動先のパス" },
      { name: "-Force", description: "既存ファイルがあっても強制的に上書きする" }
    ],
    examples: [
      { command: 'Move-Item -Path "a.txt" -Destination "D:\\archive\\a.txt"', description: "ファイルを別ドライブへ移動" },
      { command: 'Move-Item -Path "*.log" -Destination "C:\\Logs"', description: "ワイルドカードで複数のログファイルを一括移動" }
    ],
    tags: ["移動", "ファイルを移動", "フォルダを移動", "場所を変える"]
  },
  {
    id: "remove-item", name: "Remove-Item", aliases: ["rm", "del", "erase", "rd"], category: "file",
    summary: "ファイルやフォルダを削除する",
    syntax: "Remove-Item [-Path] <string[]> [-Recurse] [-Force] [-WhatIf] [-Confirm]",
    parameters: [
      { name: "-Path", description: "削除するファイル・フォルダのパス" },
      { name: "-Recurse", description: "フォルダの中身も含めてすべて削除する" },
      { name: "-Force", description: "隠しファイル・読み取り専用ファイルも削除する" },
      { name: "-WhatIf", description: "実際には削除せず、削除される対象だけ表示する（安全確認用）" }
    ],
    examples: [
      { command: 'Remove-Item -Path "old.txt"', description: "ファイルを1件削除" },
      { command: 'Remove-Item -Path "temp" -Recurse -Force', description: "フォルダを中身ごと強制削除" },
      { command: 'Remove-Item -Path "*.tmp" -WhatIf', description: "削除対象を確認だけする（実削除しない）" }
    ],
    tags: ["削除", "消す", "ファイルを削除", "フォルダを削除", "ゴミ箱", "消去"]
  },
  {
    id: "rename-item", name: "Rename-Item", aliases: ["ren"], category: "file",
    summary: "ファイルやフォルダの名前を変更する",
    syntax: "Rename-Item [-Path] <string> [-NewName] <string>",
    parameters: [
      { name: "-Path", description: "対象のファイル・フォルダのパス" },
      { name: "-NewName", description: "新しい名前" }
    ],
    examples: [
      { command: 'Rename-Item -Path "old.txt" -NewName "new.txt"', description: "ファイル名を変更" },
      { command: 'Get-ChildItem *.jpeg | Rename-Item -NewName { $_.Name -replace ".jpeg",".jpg" }', description: "複数ファイルの拡張子をまとめて変更する" }
    ],
    tags: ["名前変更", "リネーム", "ファイル名を変える"]
  },
  {
    id: "new-item", name: "New-Item", category: "file",
    summary: "新しいファイルやフォルダを作成する",
    syntax: "New-Item [-Path] <string> [-ItemType] <string> [-Value <string>]",
    parameters: [
      { name: "-Path", description: "作成する場所・名前" },
      { name: "-ItemType", description: '種類を指定（"File" または "Directory"）' },
      { name: "-Value", description: "ファイル作成時の初期内容" }
    ],
    examples: [
      { command: 'New-Item -Path "memo.txt" -ItemType File', description: "空のファイルを作成" },
      { command: 'New-Item -Path "C:\\work" -ItemType Directory', description: "新しいフォルダを作成" }
    ],
    tags: ["新規作成", "ファイルを作る", "フォルダを作る", "作成", "mkdir", "touch"]
  },
  {
    id: "get-item", name: "Get-Item", category: "file",
    summary: "指定したファイルやフォルダそのものの情報を取得する（一覧ではなく単体）",
    syntax: "Get-Item [-Path] <string[]>",
    parameters: [
      { name: "-Path", description: "取得するファイル・フォルダのパス" }
    ],
    examples: [
      { command: 'Get-Item -Path "C:\\Windows"', description: "フォルダ自体の情報（更新日時など）を表示" },
      { command: 'Get-Item -Path "C:\\Windows\\System32\\notepad.exe" | Select-Object Name, Length', description: "ファイルのプロパティ（サイズなど）だけを取得する" }
    ],
    tags: ["情報取得", "ファイル情報", "存在確認"]
  },
  {
    id: "test-path", name: "Test-Path", category: "file",
    summary: "指定したパスのファイルやフォルダが存在するかを確認する",
    syntax: "Test-Path [-Path] <string[]> [-PathType <string>]",
    parameters: [
      { name: "-Path", description: "確認したいパス" },
      { name: "-PathType", description: '"Leaf"（ファイル）または "Container"（フォルダ）で種類を限定' }
    ],
    examples: [
      { command: 'Test-Path -Path "C:\\Users\\me\\a.txt"', description: "ファイルが存在するかどうかを True/False で確認" },
      { command: 'if (-not (Test-Path "C:\\work")) { New-Item -Path "C:\\work" -ItemType Directory }', description: "フォルダが無ければ作成する、という条件分岐で使う" }
    ],
    tags: ["存在確認", "あるかどうか", "ファイルの有無", "存在チェック"]
  },
  {
    id: "get-content", name: "Get-Content", aliases: ["cat", "type", "gc"], category: "file",
    summary: "テキストファイルの内容を読み込んで表示する",
    syntax: "Get-Content [-Path] <string[]> [-Tail <int>] [-Encoding <string>]",
    parameters: [
      { name: "-Path", description: "読み込むファイルのパス" },
      { name: "-Tail", description: "末尾から指定行数だけ表示する" },
      { name: "-Encoding", description: "文字エンコーディングを指定する（例: UTF8）" }
    ],
    examples: [
      { command: 'Get-Content -Path "log.txt"', description: "ファイル全体を表示" },
      { command: 'Get-Content -Path "log.txt" -Tail 10', description: "末尾10行だけ表示（ログの確認に便利）" }
    ],
    tags: ["ファイルを読む", "内容を見る", "テキスト表示", "ログを見る", "cat"]
  },
  {
    id: "set-content", name: "Set-Content", aliases: ["sc"], category: "file",
    summary: "ファイルの内容を新しい内容で上書きする",
    syntax: "Set-Content [-Path] <string> [-Value] <string[]> [-Encoding <string>]",
    parameters: [
      { name: "-Path", description: "書き込むファイルのパス" },
      { name: "-Value", description: "書き込む内容" }
    ],
    examples: [
      { command: 'Set-Content -Path "memo.txt" -Value "こんにちは"', description: "ファイルの内容を上書きする" },
      { command: 'Get-Process | Out-String | Set-Content -Path "process.txt"', description: "別コマンドの実行結果をテキストファイルとして保存する" }
    ],
    tags: ["ファイルに書き込む", "上書き保存", "テキスト書き込み"]
  },
  {
    id: "add-content", name: "Add-Content", aliases: ["ac"], category: "file",
    summary: "既存のファイルの末尾に内容を追記する",
    syntax: "Add-Content [-Path] <string> [-Value] <string[]>",
    parameters: [
      { name: "-Path", description: "追記するファイルのパス" },
      { name: "-Value", description: "追記する内容" }
    ],
    examples: [
      { command: 'Add-Content -Path "log.txt" -Value "処理完了"', description: "ログファイルの末尾に1行追加" },
      { command: 'Get-Date | Add-Content -Path "log.txt"', description: "現在時刻をログファイルに追記する" }
    ],
    tags: ["追記", "ファイルに追加", "ログを追加"]
  },
  {
    id: "clear-content", name: "Clear-Content", category: "file",
    summary: "ファイルの内容を空にする（ファイル自体は削除しない）",
    syntax: "Clear-Content [-Path] <string[]>",
    parameters: [
      { name: "-Path", description: "内容を空にするファイルのパス" }
    ],
    examples: [
      { command: 'Clear-Content -Path "log.txt"', description: "ログファイルの内容だけを空にする" },
      { command: "Get-ChildItem *.log | ForEach-Object { Clear-Content $_.FullName }", description: "複数のログファイルをまとめて空にする" }
    ],
    tags: ["内容を消す", "ファイルを空にする", "ログをクリア"]
  },
  {
    id: "invoke-item", name: "Invoke-Item", aliases: ["ii"], category: "file",
    summary: "ファイルを既定のアプリケーションで開く（エクスプローラーでダブルクリックするのと同じ）",
    syntax: "Invoke-Item [-Path] <string[]>",
    parameters: [
      { name: "-Path", description: "開くファイル・フォルダのパス" }
    ],
    examples: [
      { command: 'Invoke-Item -Path "report.xlsx"', description: "Excelファイルを既定のアプリで開く" },
      { command: 'Invoke-Item -Path "."', description: "現在のフォルダをエクスプローラーで開く" }
    ],
    tags: ["ファイルを開く", "アプリで開く", "実行", "起動"]
  },

  // ===== location =====
  {
    id: "set-location", name: "Set-Location", aliases: ["cd", "chdir", "sl"], category: "location",
    summary: "現在の作業フォルダ（カレントディレクトリ）を移動する",
    syntax: "Set-Location [-Path] <string>",
    parameters: [
      { name: "-Path", description: "移動先のパス" }
    ],
    examples: [
      { command: 'Set-Location -Path "C:\\Projects"', description: "指定フォルダに移動する" },
      { command: "Set-Location ..", description: "1つ上のフォルダに移動する" }
    ],
    tags: ["フォルダ移動", "ディレクトリ移動", "cd", "移動する"]
  },
  {
    id: "get-location", name: "Get-Location", aliases: ["pwd", "gl"], category: "location",
    summary: "現在いるフォルダ（カレントディレクトリ）のパスを表示する",
    syntax: "Get-Location",
    parameters: [],
    examples: [
      { command: "Get-Location", description: "現在の作業フォルダのフルパスを表示" },
      { command: "$here = Get-Location", description: "現在の場所を変数に保存しておき、後で使う" }
    ],
    tags: ["現在の場所", "今どこ", "カレントディレクトリ", "pwd"]
  },
  {
    id: "push-location", name: "Push-Location", aliases: ["pushd"], category: "location",
    summary: "現在の場所を記憶してから別の場所に移動する",
    syntax: "Push-Location [-Path] <string>",
    parameters: [
      { name: "-Path", description: "移動先のパス" }
    ],
    examples: [
      { command: 'Push-Location -Path "C:\\Temp"', description: "現在地を保存してTempフォルダへ移動" },
      { command: 'Push-Location -Path "\\\\Server\\Share"', description: "共有フォルダへ一時的に移動する" }
    ],
    tags: ["場所を保存して移動", "一時的に移動", "pushd"]
  },
  {
    id: "pop-location", name: "Pop-Location", aliases: ["popd"], category: "location",
    summary: "Push-Locationで記憶した元の場所に戻る",
    syntax: "Pop-Location",
    parameters: [],
    examples: [
      { command: "Pop-Location", description: "直前にPush-Locationで保存した場所に戻る" },
      { command: 'Push-Location "C:\\Temp"; Get-ChildItem; Pop-Location', description: "一時的に移動して作業したあと、元の場所に戻る一連の流れ" }
    ],
    tags: ["元の場所に戻る", "popd"]
  },
  {
    id: "join-path", name: "Join-Path", category: "location",
    summary: "フォルダ名とファイル名などを結合して1つのパスを作る",
    syntax: "Join-Path [-Path] <string> [-ChildPath] <string>",
    parameters: [
      { name: "-Path", description: "元になるパス" },
      { name: "-ChildPath", description: "結合する子パス・ファイル名" }
    ],
    examples: [
      { command: 'Join-Path -Path "C:\\Users" -ChildPath "me"', description: '"C:\\Users\\me" というパス文字列を作る' },
      { command: 'Join-Path -Path $env:USERPROFILE -ChildPath "Documents"', description: "ユーザーのDocumentsフォルダのパスを組み立てる" }
    ],
    tags: ["パス結合", "パスを組み立てる", "結合"]
  },
  {
    id: "split-path", name: "Split-Path", category: "location",
    summary: "パス文字列からフォルダ部分・ファイル名部分などを取り出す",
    syntax: "Split-Path [-Path] <string> [-Leaf] [-Parent]",
    parameters: [
      { name: "-Path", description: "分解するパス" },
      { name: "-Leaf", description: "末尾のファイル名・フォルダ名だけを取得する" },
      { name: "-Parent", description: "親フォルダのパスを取得する" }
    ],
    examples: [
      { command: 'Split-Path -Path "C:\\Users\\me\\a.txt" -Leaf', description: '"a.txt" というファイル名だけを取得' },
      { command: 'Split-Path -Path "C:\\Users\\me\\a.txt" -Parent', description: '親フォルダのパス "C:\\Users\\me" を取得する' }
    ],
    tags: ["パス分解", "ファイル名だけ取得", "フォルダ名だけ取得"]
  },
  {
    id: "resolve-path", name: "Resolve-Path", category: "location",
    summary: "相対パスやワイルドカードを、実際に存在するフルパスに変換する",
    syntax: "Resolve-Path [-Path] <string[]>",
    parameters: [
      { name: "-Path", description: "解決したいパス（相対パス・ワイルドカード可）" }
    ],
    examples: [
      { command: 'Resolve-Path -Path ".\\..\\data"', description: "相対パスを絶対パスに変換する" },
      { command: 'Resolve-Path -Path "C:\\Users\\*\\Desktop"', description: "ワイルドカードを使って複数ユーザーのDesktopパスを一覧取得する" }
    ],
    tags: ["絶対パス取得", "相対パスを解決", "フルパス"]
  },
  {
    id: "convert-path", name: "Convert-Path", category: "location",
    summary: "PowerShell独自のパス表記を、Windowsが理解できる標準パスに変換する",
    syntax: "Convert-Path [-Path] <string[]>",
    parameters: [
      { name: "-Path", description: "変換したいパス" }
    ],
    examples: [
      { command: 'Convert-Path -Path ".\\"', description: "現在の場所を標準のファイルシステムパスに変換" },
      { command: 'Convert-Path -Path "HKCU:\\Environment"', description: "レジストリパスも標準形式に変換できる" }
    ],
    tags: ["パス変換", "標準パスに変換"]
  },

  // ===== process =====
  {
    id: "get-process", name: "Get-Process", aliases: ["ps", "gps"], category: "process",
    summary: "現在実行中のプロセス（アプリ・プログラム）の一覧を取得する",
    syntax: "Get-Process [[-Name] <string[]>] [-Id <int[]>]",
    parameters: [
      { name: "-Name", description: "プロセス名で絞り込む（例: chrome）" },
      { name: "-Id", description: "プロセスIDで絞り込む" }
    ],
    examples: [
      { command: "Get-Process", description: "実行中の全プロセスを一覧表示" },
      { command: "Get-Process -Name chrome", description: "Chromeのプロセスだけを表示" }
    ],
    tags: ["プロセス一覧", "実行中のアプリ", "タスク確認", "動いているプログラム"]
  },
  {
    id: "start-process", name: "Start-Process", aliases: ["start", "saps"], category: "process",
    summary: "新しいプロセス（アプリケーション）を起動する",
    syntax: "Start-Process [-FilePath] <string> [-ArgumentList <string[]>] [-Verb <string>] [-Wait]",
    parameters: [
      { name: "-FilePath", description: "起動する実行ファイルやコマンドのパス" },
      { name: "-ArgumentList", description: "起動時に渡す引数" },
      { name: "-Verb", description: '"RunAs" を指定すると管理者権限で起動する' },
      { name: "-Wait", description: "起動したプロセスの終了を待つ" }
    ],
    examples: [
      { command: 'Start-Process -FilePath "notepad.exe"', description: "メモ帳を起動する" },
      { command: 'Start-Process -FilePath "powershell.exe" -Verb RunAs', description: "管理者権限でPowerShellを起動する" }
    ],
    tags: ["アプリを起動", "プログラムを実行", "管理者権限で実行", "起動する"]
  },
  {
    id: "stop-process", name: "Stop-Process", aliases: ["kill", "spps"], category: "process",
    summary: "実行中のプロセスを強制終了する",
    syntax: "Stop-Process [-Name] <string[]> | [-Id] <int[]> [-Force]",
    parameters: [
      { name: "-Name", description: "終了するプロセス名" },
      { name: "-Id", description: "終了するプロセスID" },
      { name: "-Force", description: "確認なしで強制的に終了する" }
    ],
    examples: [
      { command: "Stop-Process -Name notepad", description: "名前を指定してメモ帳を終了させる" },
      { command: "Stop-Process -Id 1234 -Force", description: "プロセスIDを指定して強制終了" }
    ],
    tags: ["プロセスを終了", "強制終了", "アプリを閉じる", "強制終了する", "kill"]
  },
  {
    id: "wait-process", name: "Wait-Process", category: "process",
    summary: "指定したプロセスが終了するまで待機する",
    syntax: "Wait-Process [-Name] <string[]> [-Timeout <int>]",
    parameters: [
      { name: "-Name", description: "待機対象のプロセス名" },
      { name: "-Timeout", description: "待機する最大秒数" }
    ],
    examples: [
      { command: "Wait-Process -Name notepad", description: "メモ帳が閉じられるまで処理を待機する" },
      { command: "Start-Process notepad -PassThru | Wait-Process", description: "起動したプロセスをそのまま待機対象にする" }
    ],
    tags: ["終了を待つ", "処理待ち", "待機"]
  },

  // ===== service =====
  {
    id: "get-service", name: "Get-Service", aliases: ["gsv"], category: "service",
    summary: "Windowsサービスの一覧や状態を取得する",
    syntax: "Get-Service [[-Name] <string[]>]",
    parameters: [
      { name: "-Name", description: "サービス名で絞り込む（ワイルドカード可）" }
    ],
    examples: [
      { command: "Get-Service", description: "すべてのサービスと状態（実行中/停止中）を表示" },
      { command: "Get-Service -Name wuauserv", description: "Windows Update サービスの状態を確認" }
    ],
    tags: ["サービス一覧", "サービスの状態", "実行中か確認"]
  },
  {
    id: "start-service", name: "Start-Service", category: "service",
    summary: "停止しているWindowsサービスを開始する",
    syntax: "Start-Service [-Name] <string[]>",
    parameters: [
      { name: "-Name", description: "開始するサービス名" }
    ],
    examples: [
      { command: "Start-Service -Name wuauserv", description: "Windows Update サービスを開始する" },
      { command: 'Get-Service -Name "wu*" | Start-Service', description: "名前がwuで始まる複数のサービスを一括開始する" }
    ],
    tags: ["サービス開始", "サービスを起動"]
  },
  {
    id: "stop-service", name: "Stop-Service", category: "service",
    summary: "実行中のWindowsサービスを停止する",
    syntax: "Stop-Service [-Name] <string[]> [-Force]",
    parameters: [
      { name: "-Name", description: "停止するサービス名" },
      { name: "-Force", description: "依存するサービスも含めて強制停止する" }
    ],
    examples: [
      { command: "Stop-Service -Name wuauserv", description: "Windows Update サービスを停止する" },
      { command: 'Get-Service | Where-Object Status -eq "Running" | Stop-Service -WhatIf', description: "停止対象を実際には止めずに確認する" }
    ],
    tags: ["サービス停止", "サービスを止める"]
  },
  {
    id: "restart-service", name: "Restart-Service", category: "service",
    summary: "Windowsサービスを再起動する",
    syntax: "Restart-Service [-Name] <string[]>",
    parameters: [
      { name: "-Name", description: "再起動するサービス名" }
    ],
    examples: [
      { command: "Restart-Service -Name wuauserv", description: "サービスを一度停止してから再度開始する" },
      { command: "Restart-Service -Name wuauserv -Force", description: "依存関係があっても強制的に再起動する" }
    ],
    tags: ["サービス再起動", "サービスをリスタート"]
  },
  {
    id: "set-service", name: "Set-Service", category: "service",
    summary: "サービスの起動方法（自動・手動・無効）などの設定を変更する",
    syntax: "Set-Service [-Name] <string> [-StartupType <string>] [-Status <string>]",
    parameters: [
      { name: "-Name", description: "設定を変更するサービス名" },
      { name: "-StartupType", description: '"Automatic"、"Manual"、"Disabled" のいずれかを指定' }
    ],
    examples: [
      { command: 'Set-Service -Name wuauserv -StartupType Manual', description: "サービスの起動方法を手動に変更する" },
      { command: "Set-Service -Name wuauserv -Status Running", description: "サービスの状態（実行中/停止）を直接指定する" }
    ],
    tags: ["サービス設定変更", "自動起動を無効", "起動方法変更"]
  },
  {
    id: "suspend-service", name: "Suspend-Service", category: "service",
    summary: "一時停止（サスペンド）に対応したサービスを一時停止する",
    syntax: "Suspend-Service [-Name] <string[]>",
    parameters: [
      { name: "-Name", description: "一時停止するサービス名" }
    ],
    examples: [
      { command: "Suspend-Service -Name ServiceName", description: "対応するサービスを一時停止する" },
      { command: "Get-Service -Name ServiceName | Suspend-Service", description: "パイプラインで取得したサービスをそのまま一時停止する" }
    ],
    tags: ["サービス一時停止", "サスペンド"]
  },
  {
    id: "resume-service", name: "Resume-Service", category: "service",
    summary: "一時停止していたサービスを再開する",
    syntax: "Resume-Service [-Name] <string[]>",
    parameters: [
      { name: "-Name", description: "再開するサービス名" }
    ],
    examples: [
      { command: "Resume-Service -Name ServiceName", description: "一時停止していたサービスを再開する" },
      { command: "Get-Service -Name ServiceName | Resume-Service", description: "パイプラインで取得したサービスをそのまま再開する" }
    ],
    tags: ["サービス再開", "レジューム"]
  },

  // ===== network =====
  {
    id: "test-connection", name: "Test-Connection", category: "network",
    summary: "指定したコンピューターやサーバーに通信できるか確認する（pingに相当）",
    syntax: "Test-Connection [-TargetName] <string[]> [-Count <int>]",
    parameters: [
      { name: "-TargetName", description: "接続確認する相手のホスト名・IPアドレス" },
      { name: "-Count", description: "送信するパケット数" }
    ],
    examples: [
      { command: "Test-Connection -TargetName google.com", description: "google.comに通信できるか確認する（ping）" },
      { command: "Test-Connection -TargetName 192.168.1.1 -Count 1 -Quiet", description: "成功/失敗だけをTrue/Falseで簡潔に確認する" }
    ],
    tags: ["ping", "通信確認", "接続確認", "疎通確認", "つながるか確認"]
  },
  {
    id: "test-netconnection", name: "Test-NetConnection", category: "network",
    summary: "指定したポート番号を含めて、より詳細にネットワーク接続を確認する",
    syntax: "Test-NetConnection [-ComputerName] <string> [-Port <int>]",
    parameters: [
      { name: "-ComputerName", description: "接続確認する相手のホスト名" },
      { name: "-Port", description: "確認するポート番号（例: 443）" }
    ],
    examples: [
      { command: "Test-NetConnection -ComputerName example.com -Port 443", description: "指定ポートで通信できるか確認する" },
      { command: "Test-NetConnection -ComputerName example.com -TraceRoute", description: "経路（ルート）も含めて確認する" }
    ],
    tags: ["ポート確認", "接続テスト", "traceroute", "疎通確認"]
  },
  {
    id: "get-netipaddress", name: "Get-NetIPAddress", category: "network",
    summary: "このPCに割り当てられているIPアドレスの一覧を取得する",
    syntax: "Get-NetIPAddress [-AddressFamily <string>]",
    parameters: [
      { name: "-AddressFamily", description: '"IPv4" または "IPv6" で絞り込む' }
    ],
    examples: [
      { command: "Get-NetIPAddress -AddressFamily IPv4", description: "現在のIPv4アドレスを確認する" },
      { command: "Get-NetIPAddress | Select-Object InterfaceAlias, IPAddress", description: "どのアダプターがどのIPを持っているかを簡潔に表示する" }
    ],
    tags: ["IPアドレス確認", "自分のIP", "ipconfig"]
  },
  {
    id: "get-netadapter", name: "Get-NetAdapter", category: "network",
    summary: "ネットワークアダプター（LAN・Wi-Fiなど）の一覧と状態を取得する",
    syntax: "Get-NetAdapter [[-Name] <string[]>]",
    parameters: [
      { name: "-Name", description: "アダプター名で絞り込む" }
    ],
    examples: [
      { command: "Get-NetAdapter", description: "すべてのネットワークアダプターの状態を表示" },
      { command: 'Get-NetAdapter | Where-Object Status -eq "Up"', description: "現在有効になっているアダプターだけを表示する" }
    ],
    tags: ["ネットワークアダプター", "LAN確認", "Wi-Fi確認"]
  },
  {
    id: "resolve-dnsname", name: "Resolve-DnsName", category: "network",
    summary: "ドメイン名からIPアドレスを調べる（nslookupに相当）",
    syntax: "Resolve-DnsName [-Name] <string>",
    parameters: [
      { name: "-Name", description: "名前解決したいドメイン名" }
    ],
    examples: [
      { command: "Resolve-DnsName -Name example.com", description: "ドメイン名に対応するIPアドレスを調べる" },
      { command: "Resolve-DnsName -Name example.com -Type MX", description: "メールサーバー（MXレコード）を調べる" }
    ],
    tags: ["nslookup", "DNS確認", "IPアドレスを調べる", "名前解決"]
  },
  {
    id: "get-nettcpconnection", name: "Get-NetTCPConnection", category: "network",
    summary: "現在確立しているTCP接続の一覧を取得する（netstatに相当）",
    syntax: "Get-NetTCPConnection [-State <string>]",
    parameters: [
      { name: "-State", description: '接続状態で絞り込む（例: "Established"）' }
    ],
    examples: [
      { command: "Get-NetTCPConnection -State Established", description: "現在接続中のTCP通信一覧を表示" },
      { command: "Get-NetTCPConnection -LocalPort 443", description: "特定のポート番号を使っている接続を確認する" }
    ],
    tags: ["netstat", "接続一覧", "ポート使用状況"]
  },
  {
    id: "invoke-webrequest", name: "Invoke-WebRequest", aliases: ["iwr", "curl", "wget"], category: "network",
    summary: "WebサイトやAPIにHTTPリクエストを送り、レスポンスを取得する",
    syntax: "Invoke-WebRequest [-Uri] <string> [-Method <string>] [-OutFile <string>]",
    parameters: [
      { name: "-Uri", description: "リクエスト先のURL" },
      { name: "-Method", description: "HTTPメソッド（GET、POSTなど）" },
      { name: "-OutFile", description: "レスポンス内容を保存するファイルパス" }
    ],
    examples: [
      { command: 'Invoke-WebRequest -Uri "https://example.com"', description: "Webページを取得してステータスなどを確認" },
      { command: 'Invoke-WebRequest -Uri "https://example.com/file.zip" -OutFile "file.zip"', description: "ファイルをダウンロードする" }
    ],
    tags: ["Webリクエスト", "ダウンロード", "curl", "wget", "APIを呼ぶ", "HTTPリクエスト"]
  },
  {
    id: "invoke-restmethod", name: "Invoke-RestMethod", aliases: ["irm"], category: "network",
    summary: "REST APIを呼び出し、JSONなどのレスポンスをオブジェクトとして取得する",
    syntax: "Invoke-RestMethod [-Uri] <string> [-Method <string>] [-Body <object>]",
    parameters: [
      { name: "-Uri", description: "APIのエンドポイントURL" },
      { name: "-Method", description: "HTTPメソッド（GET、POSTなど）" },
      { name: "-Body", description: "POST時に送信するデータ" }
    ],
    examples: [
      { command: 'Invoke-RestMethod -Uri "https://api.example.com/data"', description: "APIからJSONデータを取得し、そのままオブジェクトとして扱う" },
      { command: 'Invoke-RestMethod -Uri "https://api.example.com/items" -Method Post -Body (@{name="test"} | ConvertTo-Json) -ContentType "application/json"', description: "JSONデータをPOSTでAPIに送信する" }
    ],
    tags: ["REST API", "API呼び出し", "JSON取得", "Web API"]
  },

  // ===== registry =====
  {
    id: "get-itemproperty", name: "Get-ItemProperty", category: "registry",
    summary: "レジストリキーの値（プロパティ）を取得する",
    syntax: "Get-ItemProperty [-Path] <string> [-Name <string>]",
    parameters: [
      { name: "-Path", description: "レジストリキーのパス（例: HKLM:\\Software\\...）" },
      { name: "-Name", description: "取得する値の名前" }
    ],
    examples: [
      { command: 'Get-ItemProperty -Path "HKCU:\\Environment"', description: "指定レジストリキーの値を取得する" },
      { command: 'Get-ItemProperty -Path "HKLM:\\Software\\Microsoft\\Windows NT\\CurrentVersion" -Name ProductName', description: "OSのエディション名を取得する" }
    ],
    tags: ["レジストリ値取得", "レジストリを読む"]
  },
  {
    id: "set-itemproperty", name: "Set-ItemProperty", category: "registry",
    summary: "レジストリキーの値（プロパティ）を設定・変更する",
    syntax: "Set-ItemProperty [-Path] <string> [-Name] <string> [-Value] <object>",
    parameters: [
      { name: "-Path", description: "レジストリキーのパス" },
      { name: "-Name", description: "変更する値の名前" },
      { name: "-Value", description: "設定する新しい値" }
    ],
    examples: [
      { command: 'Set-ItemProperty -Path "HKCU:\\Environment" -Name "MyVar" -Value "1"', description: "レジストリ値を設定する" },
      { command: 'Set-ItemProperty -Path "HKCU:\\Environment" -Name "MyVar" -Value "2"', description: "既存の値を新しい値に更新する" }
    ],
    tags: ["レジストリ変更", "レジストリを書き込む", "設定を変更"]
  },
  {
    id: "new-itemproperty", name: "New-ItemProperty", category: "registry",
    summary: "レジストリキーに新しい値（プロパティ）を追加する",
    syntax: "New-ItemProperty [-Path] <string> [-Name] <string> [-Value] <object> [-PropertyType <string>]",
    parameters: [
      { name: "-Path", description: "レジストリキーのパス" },
      { name: "-Name", description: "追加する値の名前" },
      { name: "-Value", description: "設定する値" },
      { name: "-PropertyType", description: '値の種類（"String"、"DWord" など）' }
    ],
    examples: [
      { command: 'New-ItemProperty -Path "HKCU:\\Environment" -Name "MyVar" -Value "1" -PropertyType String', description: "新しいレジストリ値を作成する" },
      { command: 'New-ItemProperty -Path "HKCU:\\Environment" -Name "Count" -Value 1 -PropertyType DWord', description: "数値（DWord）型の値を作成する" }
    ],
    tags: ["レジストリ追加", "新しい値を作成"]
  },
  {
    id: "remove-itemproperty", name: "Remove-ItemProperty", category: "registry",
    summary: "レジストリキーの値（プロパティ）を削除する",
    syntax: "Remove-ItemProperty [-Path] <string> [-Name] <string>",
    parameters: [
      { name: "-Path", description: "レジストリキーのパス" },
      { name: "-Name", description: "削除する値の名前" }
    ],
    examples: [
      { command: 'Remove-ItemProperty -Path "HKCU:\\Environment" -Name "MyVar"', description: "レジストリ値を削除する" },
      { command: 'Remove-ItemProperty -Path "HKCU:\\Environment" -Name "OldVar" -ErrorAction SilentlyContinue', description: "存在しない場合もエラーにせず削除する" }
    ],
    tags: ["レジストリ削除", "値を消す"]
  },
  {
    id: "copy-itemproperty", name: "Copy-ItemProperty", category: "registry",
    summary: "レジストリの値（プロパティ）を別のキーへコピーする",
    syntax: "Copy-ItemProperty [-Path] <string> [-Destination] <string> [-Name] <string>",
    parameters: [
      { name: "-Path", description: "コピー元のレジストリキー" },
      { name: "-Destination", description: "コピー先のレジストリキー" },
      { name: "-Name", description: "コピーする値の名前" }
    ],
    examples: [
      { command: 'Copy-ItemProperty -Path "HKCU:\\A" -Destination "HKCU:\\B" -Name "MyVar"', description: "レジストリ値を別のキーへコピーする" },
      { command: 'Copy-ItemProperty -Path "HKCU:\\A" -Destination "HKCU:\\C" -Name "MyVar"', description: "同じ値を複数のキーへ展開したい場合、コピー先を変えて繰り返し実行する" }
    ],
    tags: ["レジストリコピー", "値を複製"]
  },
  {
    id: "rename-itemproperty", name: "Rename-ItemProperty", category: "registry",
    summary: "レジストリの値（プロパティ）の名前を変更する",
    syntax: "Rename-ItemProperty [-Path] <string> [-Name] <string> [-NewName] <string>",
    parameters: [
      { name: "-Path", description: "レジストリキーのパス" },
      { name: "-Name", description: "変更前の値の名前" },
      { name: "-NewName", description: "変更後の名前" }
    ],
    examples: [
      { command: 'Rename-ItemProperty -Path "HKCU:\\Environment" -Name "MyVar" -NewName "MyVar2"', description: "レジストリ値の名前を変更する" },
      { command: 'Rename-ItemProperty -Path "HKLM:\\Software\\MyApp" -Name "OldName" -NewName "NewName"', description: "アプリ設定用のレジストリ値の名前を整理する" }
    ],
    tags: ["レジストリ名変更", "値の名前変更"]
  },

  // ===== dataio =====
  {
    id: "convertto-json", name: "ConvertTo-Json", category: "dataio",
    summary: "オブジェクトをJSON形式の文字列に変換する",
    syntax: "ConvertTo-Json [-InputObject] <object> [-Depth <int>]",
    parameters: [
      { name: "-InputObject", description: "変換するオブジェクト（パイプライン入力可）" },
      { name: "-Depth", description: "入れ子構造をどこまで展開するかの深さ" }
    ],
    examples: [
      { command: "Get-Process | Select-Object -First 1 | ConvertTo-Json", description: "プロセス情報をJSON文字列として出力する" },
      { command: "Get-Process | Select-Object -First 3 Name, Id | ConvertTo-Json -Depth 2", description: "深い階層まで展開してJSON化する" }
    ],
    tags: ["JSON変換", "JSONに変換", "オブジェクトをJSON化"]
  },
  {
    id: "convertfrom-json", name: "ConvertFrom-Json", category: "dataio",
    summary: "JSON形式の文字列をPowerShellのオブジェクトに変換する",
    syntax: "ConvertFrom-Json [-InputObject] <string>",
    parameters: [
      { name: "-InputObject", description: "変換するJSON文字列" }
    ],
    examples: [
      { command: '\'{"name":"test"}\' | ConvertFrom-Json', description: "JSON文字列をオブジェクトに変換してプロパティにアクセスできるようにする" },
      { command: 'Get-Content -Path "data.json" -Raw | ConvertFrom-Json', description: "JSONファイルを読み込んでオブジェクト化する" }
    ],
    tags: ["JSON読み込み", "JSONを解析", "JSONをオブジェクト化"]
  },
  {
    id: "convertto-csv", name: "ConvertTo-Csv", category: "dataio",
    summary: "オブジェクトをCSV形式の文字列に変換する",
    syntax: "ConvertTo-Csv [-InputObject] <object> [-Delimiter <char>] [-NoTypeInformation]",
    parameters: [
      { name: "-InputObject", description: "変換するオブジェクト" },
      { name: "-Delimiter", description: "区切り文字（既定はカンマ）" }
    ],
    examples: [
      { command: "Get-Process | ConvertTo-Csv -NoTypeInformation", description: "プロセス一覧をCSV形式の文字列に変換する" },
      { command: 'Get-Process | Select-Object Name, CPU | ConvertTo-Csv -Delimiter ";" -NoTypeInformation', description: "区切り文字をセミコロンにして変換する" }
    ],
    tags: ["CSV変換", "CSVに変換"]
  },
  {
    id: "convertfrom-csv", name: "ConvertFrom-Csv", category: "dataio",
    summary: "CSV形式の文字列をオブジェクトに変換する",
    syntax: "ConvertFrom-Csv [-InputObject] <string[]>",
    parameters: [
      { name: "-InputObject", description: "変換するCSV文字列" }
    ],
    examples: [
      { command: "Get-Content data.csv | ConvertFrom-Csv", description: "CSVファイルの内容をオブジェクトの配列として扱う" },
      { command: 'ConvertFrom-Csv -InputObject $csvText -Delimiter ";"', description: "区切り文字がセミコロンのCSV文字列を変換する" }
    ],
    tags: ["CSV読み込み", "CSVを解析"]
  },
  {
    id: "export-csv", name: "Export-Csv", category: "dataio",
    summary: "オブジェクトをCSVファイルとして保存する",
    syntax: "Export-Csv [-Path] <string> [-NoTypeInformation] [-Encoding <string>]",
    parameters: [
      { name: "-Path", description: "保存先のCSVファイルパス" },
      { name: "-NoTypeInformation", description: "1行目に型情報を出力しない（Excelで開きやすくする）" },
      { name: "-Encoding", description: "文字エンコーディングを指定（例: UTF8）" }
    ],
    examples: [
      { command: 'Get-Process | Export-Csv -Path "process.csv" -NoTypeInformation', description: "プロセス一覧をCSVファイルとして保存する" },
      { command: 'Get-Service | Export-Csv -Path "service.csv" -NoTypeInformation -Encoding UTF8', description: "文字エンコーディングを指定して保存する（Excelでの文字崩れ対策）" }
    ],
    tags: ["CSV保存", "CSV出力", "エクセルで開く", "CSVファイルを作る"]
  },
  {
    id: "import-csv", name: "Import-Csv", category: "dataio",
    summary: "CSVファイルを読み込んでオブジェクトの配列として扱う",
    syntax: "Import-Csv [-Path] <string> [-Delimiter <char>]",
    parameters: [
      { name: "-Path", description: "読み込むCSVファイルのパス" },
      { name: "-Delimiter", description: "区切り文字（既定はカンマ）" }
    ],
    examples: [
      { command: 'Import-Csv -Path "data.csv"', description: "CSVファイルを読み込み、各行をオブジェクトとして扱う" },
      { command: 'Import-Csv -Path "data.csv" -Delimiter ";"', description: "区切り文字がセミコロンのCSVファイルを読み込む" }
    ],
    tags: ["CSV読み込み", "CSVファイルを開く", "CSVをインポート"]
  },
  {
    id: "out-file", name: "Out-File", category: "dataio",
    summary: "コマンドの実行結果をファイルに書き出す",
    syntax: "Out-File [-FilePath] <string> [-Append] [-Encoding <string>]",
    parameters: [
      { name: "-FilePath", description: "出力先のファイルパス" },
      { name: "-Append", description: "既存ファイルの末尾に追記する" },
      { name: "-Encoding", description: "文字エンコーディングを指定" }
    ],
    examples: [
      { command: 'Get-Process | Out-File -FilePath "result.txt"', description: "プロセス一覧の表示結果をテキストファイルに保存する" },
      { command: 'Get-Content "a.txt" | Out-File -FilePath "b.txt" -Append', description: "既存ファイルの末尾に追記する" }
    ],
    tags: ["結果をファイルに保存", "出力をファイル化", "テキスト保存"]
  },
  {
    id: "select-string", name: "Select-String", aliases: ["sls"], category: "dataio",
    summary: "ファイルやテキストの中から、指定した文字列やパターンを検索する（grepに相当）",
    syntax: "Select-String [-Path] <string[]> [-Pattern] <string> [-CaseSensitive] [-NotMatch]",
    parameters: [
      { name: "-Path", description: "検索対象のファイルパス" },
      { name: "-Pattern", description: "検索する文字列や正規表現" },
      { name: "-CaseSensitive", description: "大文字・小文字を区別する" },
      { name: "-NotMatch", description: "パターンに一致しない行を表示する" }
    ],
    examples: [
      { command: 'Select-String -Path "*.log" -Pattern "Error"', description: "logファイルの中から Error を含む行を検索する" },
      { command: 'Get-ChildItem -Recurse -Filter *.ps1 | Select-String -Pattern "TODO"', description: "複数のスクリプトファイルからTODOコメントを一括検索する" }
    ],
    tags: ["文字列検索", "grep", "ファイル内検索", "特定の文字列を探す", "テキスト検索"]
  },

  // ===== variable =====
  {
    id: "get-variable", name: "Get-Variable", aliases: ["gv"], category: "variable",
    summary: "現在定義されている変数の一覧や値を取得する",
    syntax: "Get-Variable [[-Name] <string[]>]",
    parameters: [
      { name: "-Name", description: "変数名で絞り込む" }
    ],
    examples: [
      { command: "Get-Variable", description: "現在定義されている変数を一覧表示する" },
      { command: 'Get-Variable -Name "count" -ValueOnly', description: "変数の値だけを取得する" }
    ],
    tags: ["変数一覧", "変数の値を確認"]
  },
  {
    id: "set-variable", name: "Set-Variable", aliases: ["sv"], category: "variable",
    summary: "変数に値を設定する（= 演算子と同等の操作をコマンドで行う）",
    syntax: "Set-Variable [-Name] <string> [-Value] <object>",
    parameters: [
      { name: "-Name", description: "設定する変数名" },
      { name: "-Value", description: "設定する値" }
    ],
    examples: [
      { command: 'Set-Variable -Name "count" -Value 10', description: "変数countに10を設定する" },
      { command: 'Set-Variable -Name "total" -Value (10 + 5)', description: "計算結果を変数に設定する" }
    ],
    tags: ["変数に値を設定", "変数代入"]
  },
  {
    id: "new-variable", name: "New-Variable", aliases: ["nv"], category: "variable",
    summary: "新しい変数を作成する",
    syntax: "New-Variable [-Name] <string> [-Value <object>]",
    parameters: [
      { name: "-Name", description: "作成する変数名" },
      { name: "-Value", description: "初期値" }
    ],
    examples: [
      { command: 'New-Variable -Name "greeting" -Value "こんにちは"', description: "新しい変数を作成して初期値を設定する" },
      { command: 'New-Variable -Name "readOnlyVar" -Value 100 -Option ReadOnly', description: "変更できない読み取り専用の変数を作成する" }
    ],
    tags: ["変数作成", "新しい変数"]
  },
  {
    id: "remove-variable", name: "Remove-Variable", aliases: ["rv"], category: "variable",
    summary: "定義済みの変数を削除する",
    syntax: "Remove-Variable [-Name] <string[]>",
    parameters: [
      { name: "-Name", description: "削除する変数名" }
    ],
    examples: [
      { command: 'Remove-Variable -Name "count"', description: "変数countを削除する" },
      { command: 'Get-Variable -Name "temp*" | Remove-Variable', description: "名前が temp で始まる変数をまとめて削除する" }
    ],
    tags: ["変数削除", "変数を消す"]
  },
  {
    id: "clear-variable", name: "Clear-Variable", aliases: ["clv"], category: "variable",
    summary: "変数の値を空（$null）にする（変数自体は残す）",
    syntax: "Clear-Variable [-Name] <string[]>",
    parameters: [
      { name: "-Name", description: "値を空にする変数名" }
    ],
    examples: [
      { command: 'Clear-Variable -Name "count"', description: "変数countの値を空にする" },
      { command: 'Get-Variable -Name "a","b" | Clear-Variable', description: "複数の変数を一括で空にする" }
    ],
    tags: ["変数の値を消す", "変数を初期化"]
  },

  // ===== pipeline =====
  {
    id: "where-object", name: "Where-Object", aliases: ["where", "?"], category: "pipeline",
    summary: "パイプラインで受け取ったデータを、条件に合うものだけに絞り込む",
    syntax: "Where-Object [-FilterScript] <scriptblock>",
    parameters: [
      { name: "-FilterScript", description: "絞り込み条件（例: { $_.Status -eq 'Running' }）" }
    ],
    examples: [
      { command: "Get-Process | Where-Object { $_.CPU -gt 100 }", description: "CPU使用量が100を超えるプロセスだけを表示" },
      { command: "Get-Service | Where-Object Status -eq 'Running'", description: "実行中のサービスだけを表示" }
    ],
    tags: ["絞り込み", "条件で検索", "フィルター", "条件抽出"]
  },
  {
    id: "foreach-object", name: "ForEach-Object", aliases: ["foreach", "%"], category: "pipeline",
    summary: "パイプラインで受け取ったデータ1件ずつに対して処理を実行する",
    syntax: "ForEach-Object [-Process] <scriptblock>",
    parameters: [
      { name: "-Process", description: "各要素に対して実行する処理" }
    ],
    examples: [
      { command: "1..5 | ForEach-Object { $_ * 2 }", description: "1から5までの各数値を2倍にする" },
      { command: 'Get-ChildItem *.txt | ForEach-Object { Rename-Item $_ ($_.Name + ".bak") }', description: "各ファイルに対して繰り返しリネーム処理を行う" }
    ],
    tags: ["繰り返し処理", "ループ", "1件ずつ処理", "forループ"]
  },
  {
    id: "sort-object", name: "Sort-Object", aliases: ["sort"], category: "pipeline",
    summary: "パイプラインのデータを指定した項目で並べ替える",
    syntax: "Sort-Object [-Property] <string[]> [-Descending]",
    parameters: [
      { name: "-Property", description: "並べ替えの基準にするプロパティ名" },
      { name: "-Descending", description: "降順（大きい順）に並べ替える" }
    ],
    examples: [
      { command: "Get-Process | Sort-Object -Property CPU -Descending", description: "CPU使用量が多い順にプロセスを並べる" },
      { command: "Get-ChildItem | Sort-Object -Property Length", description: "ファイルをサイズの小さい順に並べる" }
    ],
    tags: ["並べ替え", "ソート", "順番を変える", "大きい順", "小さい順"]
  },
  {
    id: "group-object", name: "Group-Object", aliases: ["group"], category: "pipeline",
    summary: "パイプラインのデータを指定した項目でグループ化して集計する",
    syntax: "Group-Object [-Property] <string[]>",
    parameters: [
      { name: "-Property", description: "グループ化の基準にするプロパティ名" }
    ],
    examples: [
      { command: "Get-Process | Group-Object -Property Company", description: "プロセスを提供元の会社ごとにグループ化する" },
      { command: "Get-ChildItem | Group-Object -Property Extension | Sort-Object Count -Descending", description: "拡張子ごとのファイル数を多い順に表示する" }
    ],
    tags: ["グループ化", "分類", "集計", "件数をまとめる"]
  },
  {
    id: "measure-object", name: "Measure-Object", aliases: ["measure"], category: "pipeline",
    summary: "パイプラインのデータの件数・合計・平均・最大・最小などを集計する",
    syntax: "Measure-Object [-Property] <string[]> [-Sum] [-Average] [-Maximum] [-Minimum]",
    parameters: [
      { name: "-Property", description: "集計対象のプロパティ名" },
      { name: "-Sum / -Average / -Maximum / -Minimum", description: "求める集計の種類" }
    ],
    examples: [
      { command: "Get-ChildItem | Measure-Object -Property Length -Sum", description: "フォルダ内ファイルの合計サイズを計算する" },
      { command: "Get-ChildItem | Measure-Object", description: "ファイル・フォルダの件数を数える" }
    ],
    tags: ["集計", "合計を計算", "件数を数える", "平均", "最大値", "最小値"]
  },
  {
    id: "compare-object", name: "Compare-Object", aliases: ["compare", "diff"], category: "pipeline",
    summary: "2つのデータ（リストなど）の差分を比較する",
    syntax: "Compare-Object [-ReferenceObject] <object[]> [-DifferenceObject] <object[]>",
    parameters: [
      { name: "-ReferenceObject", description: "比較の基準となるデータ" },
      { name: "-DifferenceObject", description: "比較対象のデータ" }
    ],
    examples: [
      { command: "Compare-Object -ReferenceObject $listA -DifferenceObject $listB", description: "2つのリストの違いを表示する" },
      { command: "Compare-Object $before $after -IncludeEqual", description: "一致した項目も含めて比較結果を表示する" }
    ],
    tags: ["差分比較", "違いを見る", "diff", "比較する"]
  },
  {
    id: "select-object", name: "Select-Object", aliases: ["select"], category: "pipeline",
    summary: "パイプラインのデータから必要なプロパティや件数だけを選び出す",
    syntax: "Select-Object [-Property] <string[]> [-First <int>] [-Last <int>] [-Unique]",
    parameters: [
      { name: "-Property", description: "表示するプロパティ名を指定する" },
      { name: "-First / -Last", description: "先頭・末尾から指定件数だけ取得する" },
      { name: "-Unique", description: "重複を除いて取得する" }
    ],
    examples: [
      { command: "Get-Process | Select-Object -Property Name, CPU -First 5", description: "名前とCPU使用量だけを、先頭5件表示" },
      { command: "Get-Process | Select-Object -Property * -ExcludeProperty Handles", description: "特定のプロパティだけを除外して表示する" }
    ],
    tags: ["列を選ぶ", "先頭何件", "件数を絞る", "重複を除く", "必要な項目だけ"]
  },
  {
    id: "get-member", name: "Get-Member", aliases: ["gm"], category: "pipeline",
    summary: "オブジェクトが持つプロパティやメソッドの一覧を調べる",
    syntax: "Get-Member [-InputObject] <object>",
    parameters: [
      { name: "-InputObject", description: "調べたいオブジェクト（パイプライン入力可）" }
    ],
    examples: [
      { command: "Get-Process | Get-Member", description: "プロセスオブジェクトが持つプロパティ・メソッドを一覧表示する" },
      { command: "Get-Process | Get-Member -MemberType Method", description: "使えるメソッドだけに絞って一覧表示する" }
    ],
    tags: ["プロパティ一覧", "何が使えるか調べる", "オブジェクトの構造を見る"]
  },

  // ===== format =====
  {
    id: "format-table", name: "Format-Table", aliases: ["ft"], category: "format",
    summary: "結果を表（テーブル）形式で表示する",
    syntax: "Format-Table [-Property] <string[]> [-AutoSize] [-Wrap]",
    parameters: [
      { name: "-Property", description: "表示する列を指定する" },
      { name: "-AutoSize", description: "列の幅を内容に合わせて自動調整する" },
      { name: "-Wrap", description: "はみ出した内容を折り返して表示する" }
    ],
    examples: [
      { command: "Get-Process | Format-Table -Property Name, CPU -AutoSize", description: "指定した列だけを見やすい表形式で表示する" },
      { command: "Get-Service | Format-Table -Property Name, Status -GroupBy Status", description: "ステータスごとにグループ化して表形式で表示する" }
    ],
    tags: ["表形式で表示", "テーブル表示"]
  },
  {
    id: "format-list", name: "Format-List", aliases: ["fl"], category: "format",
    summary: "結果を1件ずつ縦に並べたリスト形式で表示する",
    syntax: "Format-List [-Property] <string[]>",
    parameters: [
      { name: "-Property", description: "表示するプロパティを指定する（* で全プロパティ）" }
    ],
    examples: [
      { command: "Get-Process -Name notepad | Format-List -Property *", description: "対象の全プロパティを縦に並べて詳しく表示する" },
      { command: "Get-Date | Format-List", description: "日付オブジェクトの全プロパティを縦に表示する" }
    ],
    tags: ["詳細表示", "リスト形式で表示", "全項目表示"]
  },
  {
    id: "format-wide", name: "Format-Wide", aliases: ["fw"], category: "format",
    summary: "結果を複数列に並べて簡潔に表示する",
    syntax: "Format-Wide [-Property] <string> [-Column <int>]",
    parameters: [
      { name: "-Property", description: "表示するプロパティ" },
      { name: "-Column", description: "1行に表示する列数" }
    ],
    examples: [
      { command: "Get-ChildItem | Format-Wide -Column 4", description: "ファイル名を4列に並べて簡潔に表示する" },
      { command: "Get-Process | Select-Object -ExpandProperty Name | Format-Wide -Column 3", description: "プロセス名だけを3列に並べて表示する" }
    ],
    tags: ["簡易表示", "複数列表示"]
  },
  {
    id: "write-output", name: "Write-Output", aliases: ["echo", "write"], category: "format",
    summary: "値をパイプラインに出力する（画面表示や次のコマンドへの受け渡しに使う）",
    syntax: "Write-Output [-InputObject] <object>",
    parameters: [
      { name: "-InputObject", description: "出力する値" }
    ],
    examples: [
      { command: 'Write-Output "処理を開始します"', description: "文字列をパイプラインに出力（画面に表示）する" },
      { command: '$result = Write-Output "done"', description: "出力結果を変数として受け取ることもできる" }
    ],
    tags: ["画面に表示", "出力する", "echo", "メッセージ表示"]
  },
  {
    id: "write-host", name: "Write-Host", category: "format",
    summary: "コンソール画面に直接テキストを表示する（パイプラインには渡らない）",
    syntax: "Write-Host [-Object] <object> [-ForegroundColor <string>]",
    parameters: [
      { name: "-Object", description: "表示するテキスト" },
      { name: "-ForegroundColor", description: "文字の色を指定する（例: Green）" }
    ],
    examples: [
      { command: 'Write-Host "完了しました" -ForegroundColor Green', description: "緑色の文字で完了メッセージを表示する" },
      { command: 'Write-Host "エラー" -ForegroundColor White -BackgroundColor Red', description: "文字色と背景色を指定して強調表示する" }
    ],
    tags: ["色付きで表示", "コンソール表示", "画面出力"]
  },
  {
    id: "write-warning", name: "Write-Warning", category: "format",
    summary: "警告メッセージを表示する",
    syntax: "Write-Warning [-Message] <string>",
    parameters: [
      { name: "-Message", description: "表示する警告文" }
    ],
    examples: [
      { command: 'Write-Warning "設定ファイルが見つかりません"', description: "黄色い警告メッセージを表示する" },
      { command: 'if (-not (Test-Path "config.json")) { Write-Warning "設定ファイルがありません" }', description: "条件を満たさないときに警告を出す、という典型的な使い方" }
    ],
    tags: ["警告表示", "警告メッセージ"]
  },
  {
    id: "write-error", name: "Write-Error", category: "format",
    summary: "エラーメッセージを表示する",
    syntax: "Write-Error [-Message] <string>",
    parameters: [
      { name: "-Message", description: "表示するエラー文" }
    ],
    examples: [
      { command: 'Write-Error "処理に失敗しました"', description: "エラーメッセージを表示する" },
      { command: 'Write-Error "処理に失敗しました" -ErrorAction Stop', description: "エラーを表示したあとスクリプトの実行を停止する" }
    ],
    tags: ["エラー表示", "エラーメッセージ"]
  },
  {
    id: "out-null", name: "Out-Null", category: "format",
    summary: "コマンドの実行結果を画面に表示せずに捨てる",
    syntax: "Command | Out-Null",
    parameters: [],
    examples: [
      { command: "New-Item -Path temp.txt -ItemType File | Out-Null", description: "作成結果のメッセージを表示させずに実行する" },
      { command: "Start-Sleep -Seconds 1 | Out-Null", description: "戻り値がないコマンドでも明示的に結果を捨てておく（習慣的な書き方）" }
    ],
    tags: ["結果を表示しない", "出力を消す", "非表示にする"]
  },

  // ===== module =====
  {
    id: "get-module", name: "Get-Module", category: "module",
    summary: "現在読み込まれている、またはインストール済みのモジュールを一覧表示する",
    syntax: "Get-Module [-ListAvailable] [[-Name] <string[]>]",
    parameters: [
      { name: "-ListAvailable", description: "インストール済みの全モジュールを表示する（未読込含む）" },
      { name: "-Name", description: "モジュール名で絞り込む" }
    ],
    examples: [
      { command: "Get-Module -ListAvailable", description: "インストール済みのモジュールを一覧表示する" },
      { command: 'Get-Module -Name "Microsoft*"', description: "名前がMicrosoftで始まるモジュールに絞り込む" }
    ],
    tags: ["モジュール一覧", "インストール済み確認"]
  },
  {
    id: "import-module", name: "Import-Module", category: "module",
    summary: "モジュールを読み込み、そのコマンドを使えるようにする",
    syntax: "Import-Module [-Name] <string>",
    parameters: [
      { name: "-Name", description: "読み込むモジュール名" }
    ],
    examples: [
      { command: "Import-Module -Name Az", description: "Azureモジュールを読み込んでコマンドを使えるようにする" },
      { command: 'Import-Module -Name ".\\MyModule.psm1"', description: "自作のモジュールファイルを読み込む" }
    ],
    tags: ["モジュール読み込み", "モジュールを使う"]
  },
  {
    id: "install-module", name: "Install-Module", category: "module",
    summary: "PowerShell Galleryなどからモジュールをダウンロード・インストールする",
    syntax: "Install-Module [-Name] <string> [-Scope <string>]",
    parameters: [
      { name: "-Name", description: "インストールするモジュール名" },
      { name: "-Scope", description: '"CurrentUser" または "AllUsers" を指定' }
    ],
    examples: [
      { command: "Install-Module -Name Az -Scope CurrentUser", description: "Azureモジュールを現在のユーザー用にインストールする" },
      { command: "Install-Module -Name Az -Force -AllowClobber", description: "確認なしで強制的にインストールする（既存コマンドと名前が重複しても許可する）" }
    ],
    tags: ["モジュールインストール", "パッケージインストール", "追加機能を入れる"]
  },
  {
    id: "find-module", name: "Find-Module", category: "module",
    summary: "PowerShell Galleryで公開されているモジュールを検索する",
    syntax: "Find-Module [-Name] <string>",
    parameters: [
      { name: "-Name", description: "検索したいモジュール名（ワイルドカード可）" }
    ],
    examples: [
      { command: "Find-Module -Name Az*", description: "名前がAzで始まるモジュールを検索する" },
      { command: 'Find-Module -Name Az -RequiredVersion "10.0.0"', description: "特定のバージョンのモジュールを検索する" }
    ],
    tags: ["モジュール検索", "パッケージを探す"]
  },
  {
    id: "update-module", name: "Update-Module", category: "module",
    summary: "インストール済みのモジュールを最新版に更新する",
    syntax: "Update-Module [-Name] <string>",
    parameters: [
      { name: "-Name", description: "更新するモジュール名" }
    ],
    examples: [
      { command: "Update-Module -Name Az", description: "Azureモジュールを最新版に更新する" },
      { command: "Get-InstalledModule | Update-Module", description: "インストール済みのモジュールをまとめて更新する" }
    ],
    tags: ["モジュール更新", "アップデート"]
  },
  {
    id: "uninstall-module", name: "Uninstall-Module", category: "module",
    summary: "インストール済みのモジュールを削除する",
    syntax: "Uninstall-Module [-Name] <string>",
    parameters: [
      { name: "-Name", description: "削除するモジュール名" }
    ],
    examples: [
      { command: "Uninstall-Module -Name Az", description: "Azureモジュールをアンインストールする" },
      { command: "Uninstall-Module -Name Az -AllVersions", description: "インストールされている全バージョンを削除する" }
    ],
    tags: ["モジュール削除", "アンインストール"]
  },
  {
    id: "get-installedmodule", name: "Get-InstalledModule", category: "module",
    summary: "Install-Moduleでインストールしたモジュールの一覧を取得する",
    syntax: "Get-InstalledModule [[-Name] <string>]",
    parameters: [
      { name: "-Name", description: "モジュール名で絞り込む" }
    ],
    examples: [
      { command: "Get-InstalledModule", description: "Install-Moduleでインストールしたモジュールを一覧表示する" },
      { command: "Get-InstalledModule | Select-Object Name, Version", description: "インストール済みモジュールの名前とバージョンだけを表示する" }
    ],
    tags: ["インストール済みモジュール確認"]
  },

  // ===== remoting =====
  {
    id: "invoke-command", name: "Invoke-Command", aliases: ["icm"], category: "remoting",
    summary: "ローカルまたは遠隔のコンピューター上でコマンドを実行する",
    syntax: "Invoke-Command [-ComputerName] <string[]> [-ScriptBlock] <scriptblock>",
    parameters: [
      { name: "-ComputerName", description: "実行先のコンピューター名" },
      { name: "-ScriptBlock", description: "実行するコマンド・スクリプト" }
    ],
    examples: [
      { command: "Invoke-Command -ComputerName Server01 -ScriptBlock { Get-Process }", description: "リモートPCでGet-Processを実行する" },
      { command: "Invoke-Command -ComputerName Server01, Server02 -ScriptBlock { Get-Service wuauserv }", description: "複数のリモートPCに対して同時にコマンドを実行する" }
    ],
    tags: ["リモート実行", "遠隔操作", "別PCでコマンド実行"]
  },
  {
    id: "new-pssession", name: "New-PSSession", category: "remoting",
    summary: "リモートコンピューターへの永続的な接続（セッション）を作成する",
    syntax: "New-PSSession [-ComputerName] <string[]>",
    parameters: [
      { name: "-ComputerName", description: "接続先のコンピューター名" }
    ],
    examples: [
      { command: "New-PSSession -ComputerName Server01", description: "リモートPCとの接続セッションを作成する" },
      { command: "$session = New-PSSession -ComputerName Server01; Invoke-Command -Session $session -ScriptBlock { Get-Process }", description: "作成したセッションを使ってコマンドを実行する" }
    ],
    tags: ["リモート接続", "セッション作成"]
  },
  {
    id: "enter-pssession", name: "Enter-PSSession", category: "remoting",
    summary: "リモートコンピューターに対話的に接続し、そのまま操作できる状態にする",
    syntax: "Enter-PSSession [-ComputerName] <string>",
    parameters: [
      { name: "-ComputerName", description: "接続先のコンピューター名" }
    ],
    examples: [
      { command: "Enter-PSSession -ComputerName Server01", description: "リモートPCに接続し、そのまま対話的に操作する" },
      { command: "Enter-PSSession -ComputerName Server01 -Credential (Get-Credential)", description: "認証情報を指定してリモート接続する" }
    ],
    tags: ["リモートログイン", "対話的リモート操作"]
  },
  {
    id: "exit-pssession", name: "Exit-PSSession", category: "remoting",
    summary: "Enter-PSSessionで開いたリモート接続を終了し、ローカルに戻る",
    syntax: "Exit-PSSession",
    parameters: [],
    examples: [
      { command: "Exit-PSSession", description: "リモート接続を終了してローカルのセッションに戻る" },
      { command: "Enter-PSSession -ComputerName Server01\n# リモートPCで作業\nExit-PSSession", description: "リモート接続して作業したあと、抜けるまでの一連の流れ" }
    ],
    tags: ["リモート接続終了", "ローカルに戻る"]
  },
  {
    id: "remove-pssession", name: "Remove-PSSession", category: "remoting",
    summary: "作成済みのリモートセッションを削除して切断する",
    syntax: "Remove-PSSession [-Session] <PSSession[]>",
    parameters: [
      { name: "-Session", description: "削除するセッション（New-PSSessionの戻り値）" }
    ],
    examples: [
      { command: "Get-PSSession | Remove-PSSession", description: "すべてのリモートセッションを削除する" },
      { command: "Remove-PSSession -Session $session", description: "変数に保存しておいた特定のセッションだけを削除する" }
    ],
    tags: ["セッション削除", "リモート切断"]
  },
  {
    id: "get-pssession", name: "Get-PSSession", category: "remoting",
    summary: "現在作成されているリモートセッションの一覧を取得する",
    syntax: "Get-PSSession",
    parameters: [],
    examples: [
      { command: "Get-PSSession", description: "作成済みのリモートセッション一覧を表示する" },
      { command: "Get-PSSession -ComputerName Server01", description: "特定のコンピューターに対するセッションだけを表示する" }
    ],
    tags: ["セッション一覧", "リモート接続確認"]
  },

  // ===== job =====
  {
    id: "start-job", name: "Start-Job", category: "job",
    summary: "処理をバックグラウンドジョブとして非同期に実行する",
    syntax: "Start-Job [-ScriptBlock] <scriptblock> [-Name <string>]",
    parameters: [
      { name: "-ScriptBlock", description: "バックグラウンドで実行する処理" },
      { name: "-Name", description: "ジョブに付ける名前" }
    ],
    examples: [
      { command: "Start-Job -ScriptBlock { Start-Sleep -Seconds 10 }", description: "10秒待つ処理をバックグラウンドで実行開始する" },
      { command: 'Start-Job -Name "Backup" -ScriptBlock { Copy-Item -Path "C:\\data" -Destination "D:\\backup" -Recurse }', description: "名前を付けてバックアップ処理をバックグラウンド実行する" }
    ],
    tags: ["バックグラウンド実行", "非同期処理", "裏で実行"]
  },
  {
    id: "get-job", name: "Get-Job", category: "job",
    summary: "バックグラウンドジョブの一覧や状態を取得する",
    syntax: "Get-Job [[-Name] <string[]>]",
    parameters: [
      { name: "-Name", description: "ジョブ名で絞り込む" }
    ],
    examples: [
      { command: "Get-Job", description: "実行中・完了したジョブの一覧を表示する" },
      { command: "Get-Job -State Running", description: "現在実行中のジョブだけを表示する" }
    ],
    tags: ["ジョブ一覧", "バックグラウンド処理の確認"]
  },
  {
    id: "receive-job", name: "Receive-Job", category: "job",
    summary: "バックグラウンドジョブの実行結果を取得する",
    syntax: "Receive-Job [-Job] <Job[]> [-Keep]",
    parameters: [
      { name: "-Job", description: "結果を取得するジョブ（Get-Jobの戻り値など）" },
      { name: "-Keep", description: "取得後も結果をジョブに残しておく" }
    ],
    examples: [
      { command: "Get-Job | Receive-Job", description: "すべてのジョブの実行結果を取得する" },
      { command: "Receive-Job -Job $job -Keep", description: "結果を取得した後もジョブに結果を残しておく" }
    ],
    tags: ["ジョブ結果取得", "バックグラウンド処理の結果"]
  },
  {
    id: "stop-job", name: "Stop-Job", category: "job",
    summary: "実行中のバックグラウンドジョブを停止する",
    syntax: "Stop-Job [-Job] <Job[]>",
    parameters: [
      { name: "-Job", description: "停止するジョブ" }
    ],
    examples: [
      { command: "Get-Job | Stop-Job", description: "すべての実行中ジョブを停止する" },
      { command: 'Stop-Job -Name "Backup"', description: "名前を指定して特定のジョブを停止する" }
    ],
    tags: ["ジョブ停止", "バックグラウンド処理を止める"]
  },
  {
    id: "remove-job", name: "Remove-Job", category: "job",
    summary: "完了したバックグラウンドジョブの情報を削除する",
    syntax: "Remove-Job [-Job] <Job[]>",
    parameters: [
      { name: "-Job", description: "削除するジョブ" }
    ],
    examples: [
      { command: "Get-Job | Remove-Job", description: "すべてのジョブ情報を削除する" },
      { command: "Get-Job -State Completed | Remove-Job", description: "完了したジョブだけをまとめて削除する" }
    ],
    tags: ["ジョブ削除", "ジョブ情報を消す"]
  },
  {
    id: "wait-job", name: "Wait-Job", category: "job",
    summary: "バックグラウンドジョブが完了するまで待機する",
    syntax: "Wait-Job [-Job] <Job[]>",
    parameters: [
      { name: "-Job", description: "完了を待つジョブ" }
    ],
    examples: [
      { command: "Get-Job | Wait-Job", description: "すべてのジョブが完了するまで待機する" },
      { command: "Wait-Job -Job $job -Timeout 30", description: "最大30秒だけ待ち、それ以上は待たない" }
    ],
    tags: ["ジョブ完了待ち", "バックグラウンド処理の完了待機"]
  },

  // ===== help =====
  {
    id: "get-help", name: "Get-Help", category: "help",
    summary: "コマンドの使い方・パラメータ・使用例などのヘルプ情報を表示する",
    syntax: "Get-Help [-Name] <string> [-Examples] [-Full]",
    parameters: [
      { name: "-Name", description: "ヘルプを見たいコマンド名" },
      { name: "-Examples", description: "使用例だけを表示する" },
      { name: "-Full", description: "パラメータの詳細を含めすべて表示する" }
    ],
    examples: [
      { command: "Get-Help Get-Process -Examples", description: "Get-Processの使用例だけを表示する" },
      { command: "Get-Help about_Comparison_Operators", description: "比較演算子など、コマンド以外の一般的な話題についてのヘルプも見られる" }
    ],
    tags: ["ヘルプを見る", "使い方を調べる", "man", "マニュアル"]
  },
  {
    id: "get-command", name: "Get-Command", aliases: ["gcm"], category: "help",
    summary: "使用可能なコマンド（コマンドレット・関数など）を検索・一覧表示する",
    syntax: "Get-Command [[-Name] <string>] [-Verb <string>] [-Noun <string>]",
    parameters: [
      { name: "-Name", description: "コマンド名で絞り込む（ワイルドカード可）" },
      { name: "-Verb", description: '動詞部分で絞り込む（例: "Get"）' },
      { name: "-Noun", description: '名詞部分で絞り込む（例: "Process"）' }
    ],
    examples: [
      { command: "Get-Command -Noun Service", description: "サービスに関連するコマンドをすべて検索する" },
      { command: "Get-Command -Module Microsoft.PowerShell.Management", description: "特定のモジュールに含まれるコマンドだけを一覧表示する" }
    ],
    tags: ["コマンド検索", "コマンド一覧", "どんなコマンドがあるか調べる"]
  },
  {
    id: "get-history", name: "Get-History", aliases: ["history", "h"], category: "help",
    summary: "現在のセッションで実行したコマンドの履歴を表示する",
    syntax: "Get-History [-Count <int>]",
    parameters: [
      { name: "-Count", description: "表示する履歴の件数" }
    ],
    examples: [
      { command: "Get-History", description: "これまでに実行したコマンドの履歴を表示する" },
      { command: 'Get-History | Where-Object CommandLine -like "*Remove-Item*"', description: "過去に実行した中から特定のコマンドだけを検索する" }
    ],
    tags: ["履歴表示", "コマンド履歴", "過去に実行したコマンド"]
  },
  {
    id: "clear-history", name: "Clear-History", category: "help",
    summary: "コマンドの実行履歴を消去する",
    syntax: "Clear-History",
    parameters: [],
    examples: [
      { command: "Clear-History", description: "実行履歴をすべて消去する" },
      { command: "Clear-History -Confirm", description: "削除前に確認を求める" }
    ],
    tags: ["履歴削除", "履歴をクリア"]
  },
  {
    id: "update-help", name: "Update-Help", category: "help",
    summary: "PowerShellのヘルプファイルを最新の内容に更新する",
    syntax: "Update-Help",
    parameters: [],
    examples: [
      { command: "Update-Help", description: "インターネットから最新のヘルプファイルをダウンロードして更新する" },
      { command: "Update-Help -Module Microsoft.PowerShell.Management -Force", description: "特定のモジュールのヘルプだけを強制的に更新する" }
    ],
    tags: ["ヘルプ更新", "マニュアル更新"]
  },
  {
    id: "save-help", name: "Save-Help", category: "help",
    summary: "ヘルプファイルを指定フォルダに保存する（オフライン環境への配布用）",
    syntax: "Save-Help [-DestinationPath] <string>",
    parameters: [
      { name: "-DestinationPath", description: "ヘルプファイルの保存先フォルダ" }
    ],
    examples: [
      { command: 'Save-Help -DestinationPath "C:\\Help"', description: "ヘルプファイルを指定フォルダに保存する" },
      { command: 'Save-Help -DestinationPath "C:\\Help" -Module Microsoft.PowerShell.Management', description: "特定のモジュールのヘルプだけを保存する" }
    ],
    tags: ["ヘルプ保存", "オフラインヘルプ"]
  },

  // ===== datetime =====
  {
    id: "get-date", name: "Get-Date", category: "datetime",
    summary: "現在の日付と時刻を取得する",
    syntax: "Get-Date [-Format <string>]",
    parameters: [
      { name: "-Format", description: "表示形式を指定する（例: \"yyyy-MM-dd\"）" }
    ],
    examples: [
      { command: "Get-Date", description: "現在の日付と時刻を表示する" },
      { command: 'Get-Date -Format "yyyy-MM-dd"', description: "「2026-09-04」のような形式で日付を表示する" }
    ],
    tags: ["現在時刻", "今日の日付", "日付取得", "時刻取得"]
  },
  {
    id: "set-date", name: "Set-Date", category: "datetime",
    summary: "システムの日付や時刻を変更する（管理者権限が必要）",
    syntax: "Set-Date [-Date] <datetime>",
    parameters: [
      { name: "-Date", description: "設定する日時" }
    ],
    examples: [
      { command: 'Set-Date -Date "2026-01-01 09:00:00"', description: "システムの日時を指定した値に変更する" },
      { command: "Get-Date | Set-Date", description: "別のPCで取得した時刻に合わせるなど、取得した日時をそのまま設定する" }
    ],
    tags: ["日時変更", "システム時刻を設定"]
  },
  {
    id: "new-timespan", name: "New-TimeSpan", category: "datetime",
    summary: "2つの日時の差（期間）を計算する",
    syntax: "New-TimeSpan [-Start] <datetime> [-End] <datetime>",
    parameters: [
      { name: "-Start", description: "開始日時" },
      { name: "-End", description: "終了日時" }
    ],
    examples: [
      { command: 'New-TimeSpan -Start "2026-01-01" -End "2026-09-04"', description: "2つの日付の間の日数・時間差を計算する" },
      { command: "(New-TimeSpan -Start (Get-Date).AddDays(-7) -End (Get-Date)).Days", description: "1週間前から今日までの日数を計算する" }
    ],
    tags: ["日数計算", "期間を計算", "経過時間"]
  },

  // ===== security =====
  {
    id: "get-acl", name: "Get-Acl", category: "security",
    summary: "ファイルやフォルダのアクセス権限（ACL）を取得する",
    syntax: "Get-Acl [-Path] <string>",
    parameters: [
      { name: "-Path", description: "アクセス権を確認するファイル・フォルダのパス" }
    ],
    examples: [
      { command: 'Get-Acl -Path "C:\\work"', description: "指定フォルダのアクセス権限一覧を表示する" },
      { command: 'Get-Acl -Path "C:\\work" | Format-List', description: "アクセス権の詳細をすべて表示する" }
    ],
    tags: ["アクセス権確認", "権限を見る", "パーミッション確認"]
  },
  {
    id: "set-acl", name: "Set-Acl", category: "security",
    summary: "ファイルやフォルダのアクセス権限（ACL）を設定する",
    syntax: "Set-Acl [-Path] <string> [-AclObject] <object>",
    parameters: [
      { name: "-Path", description: "設定対象のファイル・フォルダのパス" },
      { name: "-AclObject", description: "適用するアクセス権情報（Get-Aclなどで取得したもの）" }
    ],
    examples: [
      { command: '$acl = Get-Acl "C:\\work"; Set-Acl -Path "C:\\dest" -AclObject $acl', description: "あるフォルダのアクセス権を別のフォルダにコピー・適用する" },
      { command: 'Set-Acl -Path "C:\\work" -AclObject (Get-Acl "C:\\template")', description: "テンプレートフォルダと同じアクセス権を別のフォルダに適用する" }
    ],
    tags: ["アクセス権設定", "権限を変更", "パーミッション設定"]
  },
  {
    id: "set-executionpolicy", name: "Set-ExecutionPolicy", category: "security",
    summary: "PowerShellスクリプトの実行を許可する範囲（実行ポリシー）を設定する",
    syntax: "Set-ExecutionPolicy [-ExecutionPolicy] <string> [-Scope <string>]",
    parameters: [
      { name: "-ExecutionPolicy", description: '"Restricted"、"RemoteSigned"、"Unrestricted" などを指定' },
      { name: "-Scope", description: '適用範囲（"CurrentUser" など）' }
    ],
    examples: [
      { command: "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser", description: "ローカルで作成したスクリプトの実行を許可する（よく使われる設定）" },
      { command: "Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process", description: "現在のプロセスだけ実行ポリシーを一時的に無効化する（スクリプト実行時によく使われる）" }
    ],
    tags: ["スクリプト実行を許可", "実行ポリシー変更", "スクリプトが実行できない時"]
  },
  {
    id: "get-executionpolicy", name: "Get-ExecutionPolicy", category: "security",
    summary: "現在設定されているスクリプト実行ポリシーを確認する",
    syntax: "Get-ExecutionPolicy [-List]",
    parameters: [
      { name: "-List", description: "すべての適用範囲の設定を一覧表示する" }
    ],
    examples: [
      { command: "Get-ExecutionPolicy -List", description: "現在の実行ポリシー設定を確認する" },
      { command: "Get-ExecutionPolicy -Scope CurrentUser", description: "現在のユーザーに適用されているポリシーだけを確認する" }
    ],
    tags: ["実行ポリシー確認", "スクリプトが実行できるか確認"]
  },
  {
    id: "convertto-securestring", name: "ConvertTo-SecureString", category: "security",
    summary: "通常の文字列を、暗号化されたセキュアな文字列（パスワード用など）に変換する",
    syntax: "ConvertTo-SecureString [-String] <string> [-AsPlainText]",
    parameters: [
      { name: "-String", description: "変換する文字列" },
      { name: "-AsPlainText", description: "平文の文字列から変換することを明示する" }
    ],
    examples: [
      { command: 'ConvertTo-SecureString -String "password123" -AsPlainText -Force', description: "パスワード文字列をセキュアな形式に変換する" },
      { command: '$secure = Read-Host -AsSecureString "パスワードを入力"', description: "Read-Hostと組み合わせて、入力内容を画面に表示せずに受け取る" }
    ],
    tags: ["パスワードを暗号化", "セキュア文字列", "パスワード保護"]
  },
  {
    id: "convertfrom-securestring", name: "ConvertFrom-SecureString", category: "security",
    summary: "セキュアな文字列を、暗号化されたテキスト形式に変換する（ファイル保存用など）",
    syntax: "ConvertFrom-SecureString [-SecureString] <securestring>",
    parameters: [
      { name: "-SecureString", description: "変換するセキュア文字列" }
    ],
    examples: [
      { command: "$secure | ConvertFrom-SecureString | Out-File cred.txt", description: "セキュア文字列を暗号化テキストとしてファイルに保存する" },
      { command: '$plain = [System.Net.NetworkCredential]::new("", $secureString).Password', description: "セキュア文字列を平文に戻す（.NETのクラスを使う一例）" }
    ],
    tags: ["セキュア文字列を保存", "パスワードをファイル保存"]
  },
  {
    id: "get-credential", name: "Get-Credential", category: "security",
    summary: "ユーザー名とパスワードの入力を求め、資格情報オブジェクトとして取得する",
    syntax: "Get-Credential [-UserName <string>]",
    parameters: [
      { name: "-UserName", description: "あらかじめユーザー名を指定しておく" }
    ],
    examples: [
      { command: "$cred = Get-Credential", description: "ユーザー名とパスワードの入力ダイアログを表示し、変数に保存する" },
      { command: '$cred = Get-Credential -Message "サーバーへの接続情報を入力してください"', description: "入力欄に説明メッセージを表示する" }
    ],
    tags: ["認証情報を取得", "パスワード入力", "資格情報"]
  },

  // ===== eventlog =====
  {
    id: "get-eventlog", name: "Get-EventLog", category: "eventlog",
    summary: "従来型のWindowsイベントログ（アプリケーション、システムなど）を取得する",
    syntax: "Get-EventLog [-LogName] <string> [-Newest <int>] [-EntryType <string>]",
    parameters: [
      { name: "-LogName", description: 'ログの種類（例: "Application"、"System"）' },
      { name: "-Newest", description: "新しい方から指定件数だけ取得する" },
      { name: "-EntryType", description: '種類で絞り込む（例: "Error"）' }
    ],
    examples: [
      { command: "Get-EventLog -LogName System -Newest 20", description: "システムログの最新20件を表示する" },
      { command: "Get-EventLog -LogName Application -EntryType Error -Newest 10", description: "エラー種別のログだけを新しい順に10件取得する" }
    ],
    tags: ["イベントログ確認", "エラーログ確認", "システムログ"]
  },
  {
    id: "get-winevent", name: "Get-WinEvent", category: "eventlog",
    summary: "Windowsイベントログを、より柔軟な条件で取得する（新しい形式のログにも対応）",
    syntax: "Get-WinEvent [-LogName] <string> [-MaxEvents <int>]",
    parameters: [
      { name: "-LogName", description: "取得するログ名" },
      { name: "-MaxEvents", description: "取得する最大件数" }
    ],
    examples: [
      { command: "Get-WinEvent -LogName Application -MaxEvents 10", description: "アプリケーションログの最新10件を表示する" },
      { command: 'Get-WinEvent -FilterHashtable @{LogName="System"; Level=2}', description: "レベル（重大度）を条件にして絞り込む" }
    ],
    tags: ["イベントログ確認", "詳細なログ検索"]
  },
  {
    id: "clear-eventlog", name: "Clear-EventLog", category: "eventlog",
    summary: "指定したイベントログの内容をすべて消去する",
    syntax: "Clear-EventLog [-LogName] <string[]>",
    parameters: [
      { name: "-LogName", description: "消去するログ名" }
    ],
    examples: [
      { command: "Clear-EventLog -LogName Application", description: "アプリケーションログをすべて消去する" },
      { command: "Clear-EventLog -LogName Application -ComputerName Server01", description: "リモートPCのログを消去する" }
    ],
    tags: ["イベントログ消去", "ログをクリア"]
  },
  {
    id: "write-eventlog", name: "Write-EventLog", category: "eventlog",
    summary: "指定したイベントログに新しいエントリを書き込む",
    syntax: "Write-EventLog [-LogName] <string> [-Source] <string> [-Message] <string> [-EntryType <string>]",
    parameters: [
      { name: "-LogName", description: "書き込むログ名" },
      { name: "-Source", description: "イベントの発生元（あらかじめ登録が必要）" },
      { name: "-Message", description: "記録するメッセージ" }
    ],
    examples: [
      { command: 'Write-EventLog -LogName Application -Source "MyApp" -Message "処理完了" -EntryType Information', description: "アプリケーションログに情報イベントを書き込む" },
      { command: 'Write-EventLog -LogName Application -Source "MyApp" -EventId 1001 -Message "エラー発生" -EntryType Error', description: "イベントIDを指定してエラーイベントを記録する" }
    ],
    tags: ["イベントログ書き込み", "ログを記録"]
  },
  {
    id: "new-eventlog", name: "New-EventLog", category: "eventlog",
    summary: "新しいイベントログとイベントソースを作成する",
    syntax: "New-EventLog [-LogName] <string> [-Source] <string[]>",
    parameters: [
      { name: "-LogName", description: "作成するログ名" },
      { name: "-Source", description: "登録するイベントソース名" }
    ],
    examples: [
      { command: 'New-EventLog -LogName Application -Source "MyApp"', description: "アプリケーションログに新しいイベントソースを登録する" },
      { command: 'New-EventLog -LogName "MyAppLog" -Source "MyApp"', description: "アプリ専用の新しいログファイル自体を作成する" }
    ],
    tags: ["イベントログ作成", "イベントソース登録"]
  },

  // ===== system =====
  {
    id: "get-computerinfo", name: "Get-ComputerInfo", category: "system",
    summary: "OSバージョン、メモリ、BIOSなど、このPCの詳細情報を取得する",
    syntax: "Get-ComputerInfo [-Property <string[]>]",
    parameters: [
      { name: "-Property", description: "取得する情報項目を絞り込む" }
    ],
    examples: [
      { command: "Get-ComputerInfo", description: "PCのハードウェア・OS情報をまとめて表示する" },
      { command: 'Get-ComputerInfo -Property "OsName", "OsVersion", "CsTotalPhysicalMemory"', description: "必要な項目だけに絞って表示する" }
    ],
    tags: ["PC情報確認", "システム情報", "OS情報", "スペック確認"]
  },
  {
    id: "get-host", name: "Get-Host", category: "system",
    summary: "現在使用しているPowerShellのバージョンやコンソール設定情報を取得する",
    syntax: "Get-Host",
    parameters: [],
    examples: [
      { command: "Get-Host", description: "PowerShellのバージョン情報などを表示する" },
      { command: "(Get-Host).Version", description: "PowerShellのバージョン番号だけを取得する" }
    ],
    tags: ["PowerShellバージョン確認", "ホスト情報"]
  },
  {
    id: "get-culture", name: "Get-Culture", category: "system",
    summary: "現在使用されている言語・地域（カルチャ）の設定を取得する",
    syntax: "Get-Culture",
    parameters: [],
    examples: [
      { command: "Get-Culture", description: "現在のロケール設定（例: ja-JP）を表示する" },
      { command: "(Get-Culture).DateTimeFormat.ShortDatePattern", description: "現在の設定での日付表示形式を確認する" }
    ],
    tags: ["言語設定確認", "地域設定確認", "ロケール確認"]
  },
  {
    id: "get-random", name: "Get-Random", category: "system",
    summary: "ランダムな数値を生成する",
    syntax: "Get-Random [-Minimum <int>] [-Maximum <int>]",
    parameters: [
      { name: "-Minimum", description: "生成する最小値" },
      { name: "-Maximum", description: "生成する最大値（この値未満）" }
    ],
    examples: [
      { command: "Get-Random -Minimum 1 -Maximum 100", description: "1以上100未満のランダムな整数を生成する" },
      { command: 'Get-Random -InputObject @("A","B","C")', description: "リストの中からランダムに1つを選ぶ（くじ引きのような使い方）" }
    ],
    tags: ["ランダムな数字", "乱数生成", "くじ引き"]
  },
  {
    id: "get-hotfix", name: "Get-HotFix", category: "system",
    summary: "インストールされているWindows Update（修正プログラム）の一覧を取得する",
    syntax: "Get-HotFix",
    parameters: [],
    examples: [
      { command: "Get-HotFix", description: "適用済みのWindows Updateの一覧を表示する" },
      { command: "Get-HotFix | Sort-Object InstalledOn -Descending | Select-Object -First 5", description: "最近適用された更新プログラムを5件表示する" }
    ],
    tags: ["Windows Update確認", "パッチ確認", "更新プログラム一覧"]
  },
  {
    id: "get-ciminstance", name: "Get-CimInstance", category: "system",
    summary: "WMI/CIMを通じて、PCの詳細なハードウェア・システム情報を取得する",
    syntax: "Get-CimInstance [-ClassName] <string>",
    parameters: [
      { name: "-ClassName", description: '取得する情報の種類（例: "Win32_BIOS"）' }
    ],
    examples: [
      { command: "Get-CimInstance -ClassName Win32_BIOS", description: "BIOS情報を取得する" },
      { command: "Get-CimInstance -ClassName Win32_LogicalDisk | Select-Object DeviceID, Size, FreeSpace", description: "ドライブごとの容量・空き容量を確認する" }
    ],
    tags: ["WMI情報取得", "ハードウェア情報", "詳細なシステム情報"]
  },
  {
    id: "restart-computer", name: "Restart-Computer", category: "system",
    summary: "コンピューターを再起動する",
    syntax: "Restart-Computer [-ComputerName <string[]>] [-Force]",
    parameters: [
      { name: "-ComputerName", description: "再起動する対象（省略時はローカルPC）" },
      { name: "-Force", description: "確認なしで強制的に再起動する" }
    ],
    examples: [
      { command: "Restart-Computer -Force", description: "このPCを確認なしで再起動する" },
      { command: "Restart-Computer -ComputerName Server01 -Credential (Get-Credential)", description: "認証情報を指定してリモートPCを再起動する" }
    ],
    tags: ["再起動", "PCを再起動", "リブート"]
  },
  {
    id: "stop-computer", name: "Stop-Computer", category: "system",
    summary: "コンピューターの電源を切る（シャットダウンする）",
    syntax: "Stop-Computer [-ComputerName <string[]>] [-Force]",
    parameters: [
      { name: "-ComputerName", description: "シャットダウンする対象（省略時はローカルPC）" },
      { name: "-Force", description: "確認なしで強制的にシャットダウンする" }
    ],
    examples: [
      { command: "Stop-Computer -Force", description: "このPCを確認なしでシャットダウンする" },
      { command: "Stop-Computer -ComputerName Server01, Server02", description: "複数のリモートPCを同時にシャットダウンする" }
    ],
    tags: ["シャットダウン", "電源を切る", "PCを終了"]
  },
  {
    id: "rename-computer", name: "Rename-Computer", category: "system",
    summary: "コンピューター名を変更する（反映には再起動が必要）",
    syntax: "Rename-Computer [-NewName] <string> [-Restart]",
    parameters: [
      { name: "-NewName", description: "新しいコンピューター名" },
      { name: "-Restart", description: "変更後すぐに再起動する" }
    ],
    examples: [
      { command: "Rename-Computer -NewName PC-NEW01 -Restart", description: "PC名を変更してすぐに再起動する" },
      { command: "Rename-Computer -NewName PC-NEW01 -DomainCredential (Get-Credential) -Restart", description: "ドメイン参加PCの名前を変更する場合の認証付き例" }
    ],
    tags: ["PC名変更", "コンピューター名を変更", "ホスト名変更"]
  },

  // ===== archive =====
  {
    id: "compress-archive", name: "Compress-Archive", category: "archive",
    summary: "ファイルやフォルダをZIP形式に圧縮する",
    syntax: "Compress-Archive [-Path] <string[]> [-DestinationPath] <string>",
    parameters: [
      { name: "-Path", description: "圧縮するファイル・フォルダのパス" },
      { name: "-DestinationPath", description: "作成するZIPファイルのパス" }
    ],
    examples: [
      { command: 'Compress-Archive -Path "C:\\work\\*" -DestinationPath "work.zip"', description: "フォルダの中身をZIPファイルに圧縮する" },
      { command: 'Compress-Archive -Path "a.txt","b.txt" -DestinationPath "files.zip"', description: "複数の個別ファイルを指定してZIPにまとめる" }
    ],
    tags: ["ZIP圧縮", "圧縮する", "ファイルを圧縮", "アーカイブ作成"]
  },
  {
    id: "expand-archive", name: "Expand-Archive", category: "archive",
    summary: "ZIPファイルを展開（解凍）する",
    syntax: "Expand-Archive [-Path] <string> [-DestinationPath] <string>",
    parameters: [
      { name: "-Path", description: "展開するZIPファイルのパス" },
      { name: "-DestinationPath", description: "展開先のフォルダ" }
    ],
    examples: [
      { command: 'Expand-Archive -Path "work.zip" -DestinationPath "C:\\work"', description: "ZIPファイルを指定フォルダに展開する" },
      { command: 'Expand-Archive -Path "work.zip" -DestinationPath "C:\\work" -Force', description: "展開先に同名ファイルがあっても上書きする" }
    ],
    tags: ["ZIP解凍", "展開する", "解凍する", "圧縮ファイルを開く"]
  },

  // ===== file (追加) =====
  {
    id: "get-filehash", name: "Get-FileHash", category: "file",
    summary: "ファイルのハッシュ値（チェックサム）を計算する",
    syntax: "Get-FileHash [-Path] <string[]> [-Algorithm <string>]",
    parameters: [
      { name: "-Path", description: "対象のファイルパス" },
      { name: "-Algorithm", description: "計算方式（既定はSHA256。MD5, SHA1なども指定可）" }
    ],
    examples: [
      { command: 'Get-FileHash -Path "setup.exe"', description: "ファイルのハッシュ値（SHA256）を計算してダウンロードファイルの整合性を確認する" },
      { command: 'Get-FileHash -Path "setup.exe" -Algorithm MD5', description: "MD5アルゴリズムでハッシュ値を計算する" }
    ],
    tags: ["ハッシュ値", "チェックサム", "ファイルの改ざん確認", "MD5", "SHA256", "整合性確認"]
  },

  // ===== help (追加) =====
  {
    id: "get-verb", name: "Get-Verb", category: "help",
    summary: "PowerShellのコマンドで使われる、承認済みの動詞（Get、Setなど）の一覧を取得する",
    syntax: "Get-Verb [[-Verb] <string[]>]",
    parameters: [
      { name: "-Verb", description: "絞り込みたい動詞名" }
    ],
    examples: [
      { command: "Get-Verb", description: "PowerShellで使われる承認済みの動詞（Get, Set, New等）の一覧を表示する" },
      { command: "Get-Verb -Verb Get", description: "特定の動詞の分類（グループ）を確認する" }
    ],
    tags: ["動詞一覧", "コマンドの命名規則", "承認済み動詞"]
  },

  // ===== scripting =====
  {
    id: "new-object", name: "New-Object", category: "scripting",
    summary: ".NETのクラスから新しいオブジェクト（インスタンス）を作成する",
    syntax: "New-Object [-TypeName] <string> [-ArgumentList <object[]>]",
    parameters: [
      { name: "-TypeName", description: ".NETの型名（例: System.Collections.ArrayList）" },
      { name: "-ArgumentList", description: "コンストラクタに渡す引数" }
    ],
    examples: [
      { command: "$list = New-Object -TypeName System.Collections.ArrayList", description: "可変長リストの.NETオブジェクトを作成する" },
      { command: "New-Object -TypeName System.Net.WebClient", description: "ファイルダウンロードなどに使えるWebClientオブジェクトを作成する" }
    ],
    tags: [".NETオブジェクト作成", "インスタンス生成", "オブジェクト生成"]
  },
  {
    id: "invoke-expression", name: "Invoke-Expression", aliases: ["iex"], category: "scripting",
    summary: "文字列として組み立てたコマンドやスクリプトを、その場で実行する",
    syntax: "Invoke-Expression [-Command] <string>",
    parameters: [
      { name: "-Command", description: "実行する文字列としてのコマンド" }
    ],
    examples: [
      { command: 'Invoke-Expression "Get-Process"', description: "文字列として組み立てたコマンドを実行する" },
      { command: 'Invoke-Expression (Get-Content "script.ps1" -Raw)', description: "ファイルから読み込んだスクリプト文字列を実行する" }
    ],
    tags: ["文字列をコマンドとして実行", "動的実行", "eval"]
  },
  {
    id: "add-type", name: "Add-Type", category: "scripting",
    summary: ".NETアセンブリの読み込みや、C#などのコードから独自の型を定義する",
    syntax: "Add-Type [-TypeDefinition] <string> | [-Path] <string> | [-AssemblyName] <string>",
    parameters: [
      { name: "-TypeDefinition", description: "C#などのソースコード文字列" },
      { name: "-Path", description: "コンパイルするソースファイルのパス" },
      { name: "-AssemblyName", description: "読み込む.NETアセンブリ名" }
    ],
    examples: [
      { command: 'Add-Type -AssemblyName "System.Windows.Forms"', description: ".NETのアセンブリを読み込んで機能を追加する（メッセージボックス表示など）" },
      { command: 'Add-Type -TypeDefinition "public class Sample { public static int Add(int a, int b){ return a+b; } }"', description: "C#のコードから独自の型を定義して使う" }
    ],
    tags: [".NETアセンブリ読み込み", "C#コードを使う", "型を追加"]
  },
  {
    id: "set-strictmode", name: "Set-StrictMode", category: "scripting",
    summary: "未定義の変数の使用などを検出する、厳格な検証モードを設定する",
    syntax: "Set-StrictMode -Version <string>",
    parameters: [
      { name: "-Version", description: "適用するチェックの厳格さ（例: Latest, 2.0, 3.0）" }
    ],
    examples: [
      { command: "Set-StrictMode -Version Latest", description: "未定義の変数を使うとエラーになるよう厳格な検証を有効にする" },
      { command: "Set-StrictMode -Off", description: "厳格モードを解除する" }
    ],
    tags: ["厳格モード", "未定義変数の検出", "スクリプトの品質チェック"]
  },
  {
    id: "measure-command", name: "Measure-Command", category: "scripting",
    summary: "指定した処理の実行にかかった時間を計測する",
    syntax: "Measure-Command [-Expression] <scriptblock>",
    parameters: [
      { name: "-Expression", description: "実行時間を計測したい処理" }
    ],
    examples: [
      { command: "Measure-Command { Get-ChildItem -Recurse C:\\Windows }", description: "処理の実行時間を計測する" },
      { command: "Measure-Command { 1..100000 | ForEach-Object { $_ * 2 } }", description: "ループ処理にかかる時間を確認する" }
    ],
    tags: ["実行時間計測", "処理速度を測る", "パフォーマンス確認"]
  },

  // ===== alias =====
  {
    id: "get-alias", name: "Get-Alias", aliases: ["gal"], category: "alias",
    summary: "現在定義されているエイリアス（コマンドの別名）の一覧を取得する",
    syntax: "Get-Alias [[-Name] <string[]>]",
    parameters: [
      { name: "-Name", description: "エイリアス名で絞り込む" }
    ],
    examples: [
      { command: "Get-Alias", description: "現在定義されているすべてのエイリアス（別名）を一覧表示する" },
      { command: "Get-Alias -Name gci", description: "特定のエイリアスが何のコマンドを指しているか確認する" }
    ],
    tags: ["エイリアス一覧", "別名確認", "短縮コマンド確認"]
  },
  {
    id: "set-alias", name: "Set-Alias", aliases: ["sal"], category: "alias",
    summary: "コマンドに別名（エイリアス）を設定する",
    syntax: "Set-Alias [-Name] <string> [-Value] <string>",
    parameters: [
      { name: "-Name", description: "作成・変更するエイリアス名" },
      { name: "-Value", description: "対応させる実際のコマンド名" }
    ],
    examples: [
      { command: "Set-Alias -Name gp -Value Get-Process", description: "gpと入力するとGet-Processが実行されるようにする" },
      { command: 'Set-Alias -Name np -Value "notepad.exe"', description: "よく使うアプリに短いエイリアスを付ける" }
    ],
    tags: ["エイリアス作成", "別名を設定", "短縮コマンドを作る"]
  },
  {
    id: "new-alias", name: "New-Alias", category: "alias",
    summary: "新しいエイリアス（別名）を作成する",
    syntax: "New-Alias [-Name] <string> [-Value] <string>",
    parameters: [
      { name: "-Name", description: "新しいエイリアス名（既存の場合はエラーになる）" },
      { name: "-Value", description: "対応するコマンド" }
    ],
    examples: [
      { command: "New-Alias -Name ll -Value Get-ChildItem", description: "新しいエイリアスllを作成する（既に存在する場合はSet-Aliasを使う）" },
      { command: "New-Alias -Name grep -Value Select-String", description: "よく使う別コマンドの感覚でgrepという名前を割り当てる" }
    ],
    tags: ["新しいエイリアス", "エイリアスを追加"]
  },
  {
    id: "remove-alias", name: "Remove-Alias", category: "alias",
    summary: "定義済みのエイリアス（別名）を削除する",
    syntax: "Remove-Alias [-Name] <string[]>",
    parameters: [
      { name: "-Name", description: "削除するエイリアス名" }
    ],
    examples: [
      { command: "Remove-Alias -Name ll", description: "作成したエイリアスを削除する" },
      { command: "Get-Alias np; Remove-Alias -Name np", description: "エイリアスの内容を確認してから削除する" }
    ],
    tags: ["エイリアス削除", "別名を消す"]
  },
  {
    id: "export-alias", name: "Export-Alias", category: "alias",
    summary: "現在のエイリアス設定をファイルに書き出す",
    syntax: "Export-Alias [-Path] <string>",
    parameters: [
      { name: "-Path", description: "保存先のファイルパス" }
    ],
    examples: [
      { command: 'Export-Alias -Path "myaliases.ps1"', description: "現在のエイリアス設定をファイルに書き出す" },
      { command: 'Export-Alias -Path "myaliases.csv" -As Csv', description: "CSV形式でエイリアス一覧を保存する" }
    ],
    tags: ["エイリアスをファイルに保存", "エイリアスのバックアップ"]
  },
  {
    id: "import-alias", name: "Import-Alias", category: "alias",
    summary: "ファイルに保存されたエイリアス定義を読み込む",
    syntax: "Import-Alias [-Path] <string>",
    parameters: [
      { name: "-Path", description: "読み込むエイリアス定義ファイル" }
    ],
    examples: [
      { command: 'Import-Alias -Path "myaliases.ps1"', description: "保存しておいたエイリアス定義を読み込む" },
      { command: 'Import-Alias -Path "myaliases.csv"', description: "CSV形式で保存したエイリアスを復元する" }
    ],
    tags: ["エイリアスを読み込む", "エイリアスを復元"]
  },

  // ===== psdrive =====
  {
    id: "get-psdrive", name: "Get-PSDrive", category: "psdrive",
    summary: "C:やHKCU:など、現在使用できるPSドライブの一覧を取得する",
    syntax: "Get-PSDrive [[-Name] <string[]>]",
    parameters: [
      { name: "-Name", description: "ドライブ名で絞り込む" }
    ],
    examples: [
      { command: "Get-PSDrive", description: "C:やHKCU:など、現在使用できるPSドライブの一覧を表示する" },
      { command: "Get-PSDrive -PSProvider FileSystem", description: "ファイルシステム関連のドライブだけを表示する" }
    ],
    tags: ["ドライブ一覧", "PSドライブ確認"]
  },
  {
    id: "new-psdrive", name: "New-PSDrive", category: "psdrive",
    summary: "フォルダなどに新しい名前（仮想ドライブ）を割り当てる",
    syntax: "New-PSDrive [-Name] <string> [-PSProvider] <string> [-Root] <string>",
    parameters: [
      { name: "-Name", description: "新しいドライブ名" },
      { name: "-PSProvider", description: "プロバイダーの種類（例: FileSystem）" },
      { name: "-Root", description: "実際のパス" }
    ],
    examples: [
      { command: 'New-PSDrive -Name "Data" -PSProvider FileSystem -Root "D:\\Shared"', description: 'D:\\Sharedを「Data:」という名前の短いドライブとして使えるようにする' },
      { command: 'New-PSDrive -Name "MyDocs" -PSProvider FileSystem -Root "$env:USERPROFILE\\Documents"', description: "よく使うフォルダに短い名前を付けてアクセスしやすくする" }
    ],
    tags: ["仮想ドライブ作成", "フォルダに別名を付ける", "ドライブを割り当てる"]
  },
  {
    id: "remove-psdrive", name: "Remove-PSDrive", category: "psdrive",
    summary: "作成した仮想ドライブ（PSドライブ）を削除する",
    syntax: "Remove-PSDrive [-Name] <string[]>",
    parameters: [
      { name: "-Name", description: "削除するPSドライブ名" }
    ],
    examples: [
      { command: 'Remove-PSDrive -Name "Data"', description: "作成した仮想ドライブを削除する" },
      { command: 'Remove-PSDrive -Name "MyDocs" -Force', description: "使用中でも強制的に削除する" }
    ],
    tags: ["仮想ドライブ削除", "ドライブの割り当てを解除"]
  },
  {
    id: "get-psprovider", name: "Get-PSProvider", category: "psdrive",
    summary: "FileSystemやRegistryなど、利用可能なPSプロバイダーの一覧を取得する",
    syntax: "Get-PSProvider [[-PSProvider] <string[]>]",
    parameters: [
      { name: "-PSProvider", description: "プロバイダー名で絞り込む" }
    ],
    examples: [
      { command: "Get-PSProvider", description: "FileSystemやRegistryなど、利用可能なPSプロバイダーの一覧を表示する" },
      { command: "Get-PSProvider -PSProvider Registry", description: "レジストリプロバイダーの詳細情報を確認する" }
    ],
    tags: ["プロバイダー一覧", "PSプロバイダー確認"]
  },

  // ===== scheduledtask =====
  {
    id: "get-scheduledtask", name: "Get-ScheduledTask", category: "scheduledtask",
    summary: "タスクスケジューラに登録されているタスクの一覧を取得する",
    syntax: "Get-ScheduledTask [[-TaskName] <string[]>]",
    parameters: [
      { name: "-TaskName", description: "タスク名で絞り込む" }
    ],
    examples: [
      { command: "Get-ScheduledTask", description: "タスクスケジューラに登録されているタスクの一覧を表示する" },
      { command: 'Get-ScheduledTask -TaskName "MyBackupTask"', description: "特定の名前のタスクの状態を確認する" }
    ],
    tags: ["タスク一覧", "スケジュールされたタスク確認", "タスクスケジューラ確認"]
  },
  {
    id: "register-scheduledtask", name: "Register-ScheduledTask", category: "scheduledtask",
    summary: "新しいタスクをタスクスケジューラに登録する",
    syntax: "Register-ScheduledTask [-TaskName] <string> [-Action] <object> [-Trigger] <object>",
    parameters: [
      { name: "-TaskName", description: "登録するタスク名" },
      { name: "-Action", description: "実行する内容（New-ScheduledTaskActionで作成）" },
      { name: "-Trigger", description: "実行するタイミング（New-ScheduledTaskTriggerで作成）" }
    ],
    examples: [
      { command: '$action = New-ScheduledTaskAction -Execute "notepad.exe"\n$trigger = New-ScheduledTaskTrigger -Daily -At 9am\nRegister-ScheduledTask -TaskName "DailyNotepad" -Action $action -Trigger $trigger', description: "毎日9時にメモ帳を起動するタスクを登録する" },
      { command: 'Register-ScheduledTask -TaskName "Backup" -Xml (Get-Content "task.xml" -Raw)', description: "XMLファイルの定義からタスクを登録する" }
    ],
    tags: ["タスク登録", "定期実行の設定", "スケジュールタスク作成"]
  },
  {
    id: "unregister-scheduledtask", name: "Unregister-ScheduledTask", category: "scheduledtask",
    summary: "登録済みのタスクをタスクスケジューラから削除する",
    syntax: "Unregister-ScheduledTask [-TaskName] <string> [-Confirm]",
    parameters: [
      { name: "-TaskName", description: "削除するタスク名" },
      { name: "-Confirm", description: "削除前に確認する" }
    ],
    examples: [
      { command: 'Unregister-ScheduledTask -TaskName "DailyNotepad" -Confirm:$false', description: "確認なしでタスクを削除する" },
      { command: 'Get-ScheduledTask -TaskName "Old*" | Unregister-ScheduledTask -Confirm:$false', description: "名前がOldで始まる複数のタスクをまとめて削除する" }
    ],
    tags: ["タスク削除", "スケジュールタスクを消す"]
  },
  {
    id: "start-scheduledtask", name: "Start-ScheduledTask", category: "scheduledtask",
    summary: "登録済みのタスクを今すぐ手動で実行する",
    syntax: "Start-ScheduledTask [-TaskName] <string>",
    parameters: [
      { name: "-TaskName", description: "実行するタスク名" }
    ],
    examples: [
      { command: 'Start-ScheduledTask -TaskName "DailyNotepad"', description: "登録済みのタスクを今すぐ手動で実行する" },
      { command: 'Get-ScheduledTask -TaskName "Backup" | Start-ScheduledTask', description: "パイプラインで取得したタスクをそのまま実行する" }
    ],
    tags: ["タスク実行", "タスクを今すぐ実行"]
  },
  {
    id: "stop-scheduledtask", name: "Stop-ScheduledTask", category: "scheduledtask",
    summary: "実行中のタスクを停止する",
    syntax: "Stop-ScheduledTask [-TaskName] <string>",
    parameters: [
      { name: "-TaskName", description: "停止するタスク名" }
    ],
    examples: [
      { command: 'Stop-ScheduledTask -TaskName "Backup"', description: "実行中のタスクを停止する" },
      { command: 'Get-ScheduledTask -TaskName "Backup" | Stop-ScheduledTask', description: "パイプラインで取得したタスクを停止する" }
    ],
    tags: ["タスク停止", "実行中のタスクを止める"]
  },
  {
    id: "enable-scheduledtask", name: "Enable-ScheduledTask", category: "scheduledtask",
    summary: "無効化されているタスクを有効化する",
    syntax: "Enable-ScheduledTask [-TaskName] <string>",
    parameters: [
      { name: "-TaskName", description: "有効化するタスク名" }
    ],
    examples: [
      { command: 'Enable-ScheduledTask -TaskName "Backup"', description: "無効化されていたタスクを再度有効にする" },
      { command: 'Get-ScheduledTask | Where-Object State -eq "Disabled" | Enable-ScheduledTask', description: "無効化されているタスクをまとめて有効化する" }
    ],
    tags: ["タスク有効化", "タスクを有効にする"]
  },
  {
    id: "disable-scheduledtask", name: "Disable-ScheduledTask", category: "scheduledtask",
    summary: "タスクを無効化して実行されないようにする",
    syntax: "Disable-ScheduledTask [-TaskName] <string>",
    parameters: [
      { name: "-TaskName", description: "無効化するタスク名" }
    ],
    examples: [
      { command: 'Disable-ScheduledTask -TaskName "Backup"', description: "タスクを無効化して実行されないようにする" },
      { command: 'Get-ScheduledTask -TaskName "Old*" | Disable-ScheduledTask', description: "特定のタスクをまとめて無効化する" }
    ],
    tags: ["タスク無効化", "タスクを止める（削除せず）"]
  },

  // ===== firewall =====
  {
    id: "get-netfirewallrule", name: "Get-NetFirewallRule", category: "firewall",
    summary: "Windowsファイアウォールのルールを取得する",
    syntax: "Get-NetFirewallRule [[-DisplayName] <string[]>]",
    parameters: [
      { name: "-DisplayName", description: "ルール名で絞り込む" }
    ],
    examples: [
      { command: 'Get-NetFirewallRule -DisplayName "*Remote Desktop*"', description: "リモートデスクトップ関連のファイアウォールルールを確認する" },
      { command: "Get-NetFirewallRule | Where-Object Enabled -eq $true", description: "現在有効になっているルールだけを表示する" }
    ],
    tags: ["ファイアウォールルール確認", "ファイアウォール設定確認"]
  },
  {
    id: "new-netfirewallrule", name: "New-NetFirewallRule", category: "firewall",
    summary: "新しいファイアウォールルールを作成する",
    syntax: "New-NetFirewallRule [-DisplayName] <string> [-Direction] <string> [-Action] <string> [-LocalPort <string>] [-Protocol <string>]",
    parameters: [
      { name: "-DisplayName", description: "ルール名" },
      { name: "-Direction", description: '通信の方向（"Inbound"または"Outbound"）' },
      { name: "-Action", description: '動作（"Allow"または"Block"）' },
      { name: "-LocalPort", description: "対象のポート番号" }
    ],
    examples: [
      { command: 'New-NetFirewallRule -DisplayName "Allow8080" -Direction Inbound -Action Allow -LocalPort 8080 -Protocol TCP', description: "8080番ポートへの通信を許可するルールを作成する" },
      { command: 'New-NetFirewallRule -DisplayName "BlockApp" -Direction Outbound -Action Block -Program "C:\\App\\app.exe"', description: "特定のプログラムの外部通信をブロックする" }
    ],
    tags: ["ファイアウォールルール作成", "ポートを開放", "通信を許可", "通信をブロック"]
  },
  {
    id: "set-netfirewallrule", name: "Set-NetFirewallRule", category: "firewall",
    summary: "既存のファイアウォールルールの設定を変更する",
    syntax: "Set-NetFirewallRule [-DisplayName] <string> [-Enabled <string>] [-Action <string>]",
    parameters: [
      { name: "-DisplayName", description: "変更するルール名" },
      { name: "-Enabled", description: "ルールを有効/無効にする" },
      { name: "-Action", description: "許可/ブロックの動作を変更する" }
    ],
    examples: [
      { command: 'Set-NetFirewallRule -DisplayName "Allow8080" -Enabled False', description: "ルールを一時的に無効化する" },
      { command: 'Set-NetFirewallRule -DisplayName "Allow8080" -Action Block', description: "ルールの動作を許可からブロックに変更する" }
    ],
    tags: ["ファイアウォールルール変更", "ルールの有効/無効切り替え"]
  },
  {
    id: "remove-netfirewallrule", name: "Remove-NetFirewallRule", category: "firewall",
    summary: "ファイアウォールルールを削除する",
    syntax: "Remove-NetFirewallRule [-DisplayName] <string>",
    parameters: [
      { name: "-DisplayName", description: "削除するルール名" }
    ],
    examples: [
      { command: 'Remove-NetFirewallRule -DisplayName "Allow8080"', description: "作成したファイアウォールルールを削除する" },
      { command: 'Get-NetFirewallRule -DisplayName "Old*" | Remove-NetFirewallRule', description: "名前がOldで始まる複数のルールをまとめて削除する" }
    ],
    tags: ["ファイアウォールルール削除"]
  },
  {
    id: "enable-netfirewallrule", name: "Enable-NetFirewallRule", category: "firewall",
    summary: "無効になっているファイアウォールルールを有効化する",
    syntax: "Enable-NetFirewallRule [-DisplayName] <string>",
    parameters: [
      { name: "-DisplayName", description: "有効化するルール名" }
    ],
    examples: [
      { command: 'Enable-NetFirewallRule -DisplayName "Allow8080"', description: "無効になっているルールを有効化する" },
      { command: 'Get-NetFirewallRule -DisplayGroup "リモート デスクトップ" | Enable-NetFirewallRule', description: "リモートデスクトップ関連のルールをまとめて有効化する" }
    ],
    tags: ["ファイアウォールルール有効化"]
  },
  {
    id: "disable-netfirewallrule", name: "Disable-NetFirewallRule", category: "firewall",
    summary: "ファイアウォールルールを一時的に無効化する",
    syntax: "Disable-NetFirewallRule [-DisplayName] <string>",
    parameters: [
      { name: "-DisplayName", description: "無効化するルール名" }
    ],
    examples: [
      { command: 'Disable-NetFirewallRule -DisplayName "Allow8080"', description: "ルールを一時的に無効化する" },
      { command: 'Get-NetFirewallRule -DisplayGroup "リモート デスクトップ" | Disable-NetFirewallRule', description: "リモートデスクトップ関連のルールをまとめて無効化する" }
    ],
    tags: ["ファイアウォールルール無効化"]
  },

  // ===== disk =====
  {
    id: "get-disk", name: "Get-Disk", category: "disk",
    summary: "このPCに接続されている物理ディスクの一覧を取得する",
    syntax: "Get-Disk [[-Number] <int>]",
    parameters: [
      { name: "-Number", description: "ディスク番号で絞り込む" }
    ],
    examples: [
      { command: "Get-Disk", description: "このPCに接続されているディスクの一覧を表示する" },
      { command: "Get-Disk -Number 0", description: "特定のディスク（0番）の詳細を確認する" }
    ],
    tags: ["ディスク一覧", "物理ディスク確認"]
  },
  {
    id: "get-partition", name: "Get-Partition", category: "disk",
    summary: "ディスクのパーティション一覧を取得する",
    syntax: "Get-Partition [[-DiskNumber] <int>]",
    parameters: [
      { name: "-DiskNumber", description: "対象ディスク番号" }
    ],
    examples: [
      { command: "Get-Partition", description: "すべてのディスクのパーティション一覧を表示する" },
      { command: "Get-Partition -DiskNumber 0", description: "特定のディスクのパーティションだけを表示する" }
    ],
    tags: ["パーティション一覧", "パーティション確認"]
  },
  {
    id: "get-volume", name: "Get-Volume", category: "disk",
    summary: "各ドライブの空き容量・使用状況（ボリューム情報）を取得する",
    syntax: "Get-Volume [[-DriveLetter] <string>]",
    parameters: [
      { name: "-DriveLetter", description: "ドライブ文字で絞り込む（例: C）" }
    ],
    examples: [
      { command: "Get-Volume", description: "すべてのドライブの空き容量・使用状況を表示する" },
      { command: "Get-Volume -DriveLetter C", description: "Cドライブの空き容量を確認する" }
    ],
    tags: ["ドライブ容量確認", "空き容量確認", "ボリューム確認"]
  },
  {
    id: "format-volume", name: "Format-Volume", category: "disk",
    summary: "ドライブをフォーマットする（データはすべて消去される）",
    syntax: "Format-Volume [-DriveLetter] <string> [-FileSystem] <string>",
    parameters: [
      { name: "-DriveLetter", description: "フォーマットするドライブ" },
      { name: "-FileSystem", description: "ファイルシステム（例: NTFS）" }
    ],
    examples: [
      { command: "Format-Volume -DriveLetter D -FileSystem NTFS", description: "DドライブをNTFS形式でフォーマットする（データはすべて消去される）" },
      { command: "Format-Volume -DriveLetter E -FileSystem exFAT -Confirm:$false", description: "確認なしでexFAT形式にフォーマットする" }
    ],
    tags: ["ドライブフォーマット", "ボリュームの初期化"]
  },
  {
    id: "get-physicaldisk", name: "Get-PhysicalDisk", category: "disk",
    summary: "SSD/HDDなど物理ディスクの種類や健康状態を取得する",
    syntax: "Get-PhysicalDisk [[-FriendlyName] <string[]>]",
    parameters: [
      { name: "-FriendlyName", description: "ディスク名で絞り込む" }
    ],
    examples: [
      { command: "Get-PhysicalDisk", description: "SSD/HDDなど物理ディスクの種類や状態を確認する" },
      { command: "Get-PhysicalDisk | Select-Object FriendlyName, MediaType, HealthStatus", description: "ディスクの種類（SSD/HDD）と健康状態を確認する" }
    ],
    tags: ["物理ディスク確認", "SSD確認", "ディスクの健康状態"]
  },
  {
    id: "new-partition", name: "New-Partition", category: "disk",
    summary: "ディスクに新しいパーティションを作成する",
    syntax: "New-Partition [-DiskNumber] <int> [-Size <uint64>] [-UseMaximumSize]",
    parameters: [
      { name: "-DiskNumber", description: "対象ディスク" },
      { name: "-Size", description: "作成するサイズ" },
      { name: "-UseMaximumSize", description: "残りすべての容量を使う" }
    ],
    examples: [
      { command: "New-Partition -DiskNumber 1 -UseMaximumSize", description: "ディスクの空き容量すべてを使って新しいパーティションを作成する" },
      { command: "New-Partition -DiskNumber 1 -Size 100GB", description: "100GBの新しいパーティションを作成する" }
    ],
    tags: ["パーティション作成", "新しいドライブを作る"]
  },
  {
    id: "resize-partition", name: "Resize-Partition", category: "disk",
    summary: "既存のパーティションのサイズを変更する",
    syntax: "Resize-Partition [-DriveLetter] <string> [-Size <uint64>]",
    parameters: [
      { name: "-DriveLetter", description: "対象ドライブ" },
      { name: "-Size", description: "変更後のサイズ" }
    ],
    examples: [
      { command: "Resize-Partition -DriveLetter D -Size 50GB", description: "パーティションのサイズを50GBに変更する" },
      { command: "Get-PartitionSupportedSize -DriveLetter D", description: "（参考）変更可能なサイズの範囲を確認してからResize-Partitionを使う" }
    ],
    tags: ["パーティションサイズ変更", "ドライブの容量を変更"]
  },
  {
    id: "optimize-volume", name: "Optimize-Volume", category: "disk",
    summary: "ドライブのデフラグやSSD向けの最適化（Trim）を実行する",
    syntax: "Optimize-Volume [-DriveLetter] <string> [-Defrag] [-ReTrim]",
    parameters: [
      { name: "-DriveLetter", description: "対象ドライブ" },
      { name: "-Defrag", description: "デフラグを実行する（HDD向け）" },
      { name: "-ReTrim", description: "SSD向けのTrim処理を実行する" }
    ],
    examples: [
      { command: "Optimize-Volume -DriveLetter C -Defrag", description: "Cドライブのデフラグを実行する（HDD向け）" },
      { command: "Optimize-Volume -DriveLetter C -ReTrim", description: "SSD向けの最適化（Trim）を実行する" }
    ],
    tags: ["デフラグ", "ディスク最適化", "SSD最適化"]
  },

  // ===== localaccount =====
  {
    id: "get-localuser", name: "Get-LocalUser", category: "localaccount",
    summary: "このPCに登録されているローカルユーザーの一覧を取得する",
    syntax: "Get-LocalUser [[-Name] <string[]>]",
    parameters: [
      { name: "-Name", description: "ユーザー名で絞り込む" }
    ],
    examples: [
      { command: "Get-LocalUser", description: "このPCに登録されているローカルユーザーの一覧を表示する" },
      { command: 'Get-LocalUser -Name "Guest"', description: "Guestアカウントの状態（有効/無効）を確認する" }
    ],
    tags: ["ローカルユーザー一覧", "ユーザーアカウント確認"]
  },
  {
    id: "new-localuser", name: "New-LocalUser", category: "localaccount",
    summary: "新しいローカルユーザーアカウントを作成する",
    syntax: "New-LocalUser [-Name] <string> [-Password <securestring>] [-FullName <string>]",
    parameters: [
      { name: "-Name", description: "作成するユーザー名" },
      { name: "-Password", description: "パスワード" },
      { name: "-FullName", description: "表示名" }
    ],
    examples: [
      { command: 'New-LocalUser -Name "testuser" -Password (Read-Host -AsSecureString "パスワード")', description: "新しいローカルユーザーを作成する" },
      { command: 'New-LocalUser -Name "testuser" -NoPassword', description: "パスワードなしのユーザーを作成する" }
    ],
    tags: ["ユーザー作成", "新しいアカウントを作る"]
  },
  {
    id: "remove-localuser", name: "Remove-LocalUser", category: "localaccount",
    summary: "ローカルユーザーアカウントを削除する",
    syntax: "Remove-LocalUser [-Name] <string>",
    parameters: [
      { name: "-Name", description: "削除するユーザー名" }
    ],
    examples: [
      { command: 'Remove-LocalUser -Name "testuser"', description: "ローカルユーザーを削除する" },
      { command: 'Get-LocalUser -Name "temp*" | Remove-LocalUser', description: "名前がtempで始まるユーザーをまとめて削除する" }
    ],
    tags: ["ユーザー削除", "アカウントを消す"]
  },
  {
    id: "set-localuser", name: "Set-LocalUser", category: "localaccount",
    summary: "ローカルユーザーの設定（パスワードや表示名など）を変更する",
    syntax: "Set-LocalUser [-Name] <string> [-Password <securestring>] [-AccountNeverExpires]",
    parameters: [
      { name: "-Name", description: "対象ユーザー名" },
      { name: "-Password", description: "新しいパスワード" },
      { name: "-AccountNeverExpires", description: "アカウントを無期限にする" }
    ],
    examples: [
      { command: 'Set-LocalUser -Name "testuser" -Password (Read-Host -AsSecureString "新しいパスワード")', description: "ユーザーのパスワードを変更する" },
      { command: 'Set-LocalUser -Name "testuser" -FullName "テストユーザー"', description: "ユーザーの表示名を変更する" }
    ],
    tags: ["ユーザー設定変更", "パスワード変更", "アカウント編集"]
  },
  {
    id: "get-localgroup", name: "Get-LocalGroup", category: "localaccount",
    summary: "Administratorsなど、このPCのローカルグループの一覧を取得する",
    syntax: "Get-LocalGroup [[-Name] <string[]>]",
    parameters: [
      { name: "-Name", description: "グループ名で絞り込む" }
    ],
    examples: [
      { command: "Get-LocalGroup", description: "Administratorsなど、このPCのローカルグループ一覧を表示する" },
      { command: 'Get-LocalGroup -Name "Administrators"', description: "管理者グループの情報を確認する" }
    ],
    tags: ["ローカルグループ一覧", "グループ確認"]
  },
  {
    id: "new-localgroup", name: "New-LocalGroup", category: "localaccount",
    summary: "新しいローカルグループを作成する",
    syntax: "New-LocalGroup [-Name] <string> [-Description <string>]",
    parameters: [
      { name: "-Name", description: "作成するグループ名" },
      { name: "-Description", description: "説明" }
    ],
    examples: [
      { command: 'New-LocalGroup -Name "ProjectTeam"', description: "新しいローカルグループを作成する" },
      { command: 'New-LocalGroup -Name "ProjectTeam" -Description "プロジェクト用グループ"', description: "説明付きでグループを作成する" }
    ],
    tags: ["グループ作成", "新しいグループを作る"]
  },
  {
    id: "add-localgroupmember", name: "Add-LocalGroupMember", category: "localaccount",
    summary: "ローカルグループにユーザーを追加する",
    syntax: "Add-LocalGroupMember [-Group] <string> [-Member] <string[]>",
    parameters: [
      { name: "-Group", description: "対象グループ名" },
      { name: "-Member", description: "追加するユーザー名" }
    ],
    examples: [
      { command: 'Add-LocalGroupMember -Group "Administrators" -Member "testuser"', description: "ユーザーを管理者グループに追加する" },
      { command: 'Add-LocalGroupMember -Group "ProjectTeam" -Member "user1","user2"', description: "複数のユーザーを一度にグループに追加する" }
    ],
    tags: ["グループにメンバー追加", "ユーザーをグループに入れる", "管理者権限を付与"]
  },
  {
    id: "remove-localgroupmember", name: "Remove-LocalGroupMember", category: "localaccount",
    summary: "ローカルグループからユーザーを削除する",
    syntax: "Remove-LocalGroupMember [-Group] <string> [-Member] <string[]>",
    parameters: [
      { name: "-Group", description: "対象グループ名" },
      { name: "-Member", description: "削除するユーザー名" }
    ],
    examples: [
      { command: 'Remove-LocalGroupMember -Group "Administrators" -Member "testuser"', description: "ユーザーを管理者グループから外す" },
      { command: 'Remove-LocalGroupMember -Group "ProjectTeam" -Member "user1"', description: "グループからメンバーを削除する" }
    ],
    tags: ["グループからメンバー削除", "権限を外す"]
  },
  {
    id: "get-localgroupmember", name: "Get-LocalGroupMember", category: "localaccount",
    summary: "ローカルグループに所属しているメンバーの一覧を取得する",
    syntax: "Get-LocalGroupMember [-Group] <string>",
    parameters: [
      { name: "-Group", description: "確認するグループ名" }
    ],
    examples: [
      { command: 'Get-LocalGroupMember -Group "Administrators"', description: "管理者グループに所属しているユーザーの一覧を表示する" },
      { command: 'Get-LocalGroupMember -Group "ProjectTeam"', description: "特定のグループのメンバー一覧を確認する" }
    ],
    tags: ["グループメンバー確認", "誰が管理者か確認"]
  },

  // ===== dnsclient =====
  {
    id: "get-dnsclientcache", name: "Get-DnsClientCache", category: "dnsclient",
    summary: "このPCにキャッシュされているDNS解決結果を取得する",
    syntax: "Get-DnsClientCache",
    parameters: [],
    examples: [
      { command: "Get-DnsClientCache", description: "このPCにキャッシュされているDNS解決結果を表示する" },
      { command: 'Get-DnsClientCache | Where-Object Entry -like "*example.com*"', description: "特定のドメインのキャッシュだけを確認する" }
    ],
    tags: ["DNSキャッシュ確認"]
  },
  {
    id: "clear-dnsclientcache", name: "Clear-DnsClientCache", category: "dnsclient",
    summary: "DNSキャッシュをすべて消去する（ipconfig /flushdnsに相当）",
    syntax: "Clear-DnsClientCache",
    parameters: [],
    examples: [
      { command: "Clear-DnsClientCache", description: "DNSキャッシュをすべて消去する（ipconfig /flushdnsに相当）" },
      { command: "Clear-DnsClientCache; Get-DnsClientCache", description: "キャッシュを消去してから空になったことを確認する" }
    ],
    tags: ["DNSキャッシュクリア", "flushdns", "キャッシュをクリア"]
  },
  {
    id: "get-dnsclientserveraddress", name: "Get-DnsClientServerAddress", category: "dnsclient",
    summary: "ネットワークアダプターに設定されているDNSサーバーを取得する",
    syntax: "Get-DnsClientServerAddress [[-InterfaceAlias] <string>]",
    parameters: [
      { name: "-InterfaceAlias", description: "対象のネットワークアダプター名" }
    ],
    examples: [
      { command: "Get-DnsClientServerAddress", description: "各ネットワークアダプターに設定されているDNSサーバーを表示する" },
      { command: 'Get-DnsClientServerAddress -InterfaceAlias "イーサネット"', description: "特定のアダプターのDNS設定を確認する" }
    ],
    tags: ["DNSサーバー確認", "DNS設定確認"]
  },
  {
    id: "set-dnsclientserveraddress", name: "Set-DnsClientServerAddress", category: "dnsclient",
    summary: "ネットワークアダプターのDNSサーバーを変更する",
    syntax: "Set-DnsClientServerAddress [-InterfaceAlias] <string> [-ServerAddresses] <string[]>",
    parameters: [
      { name: "-InterfaceAlias", description: "対象アダプター" },
      { name: "-ServerAddresses", description: "設定するDNSサーバーのIPアドレス" }
    ],
    examples: [
      { command: 'Set-DnsClientServerAddress -InterfaceAlias "イーサネット" -ServerAddresses "8.8.8.8","8.8.4.4"', description: "DNSサーバーをGoogle Public DNSに変更する" },
      { command: 'Set-DnsClientServerAddress -InterfaceAlias "イーサネット" -ResetServerAddresses', description: "DNS設定を自動取得（DHCP）に戻す" }
    ],
    tags: ["DNSサーバー変更", "DNS設定変更"]
  },

  // ===== network (追加) =====
  {
    id: "new-netipaddress", name: "New-NetIPAddress", category: "network",
    summary: "ネットワークアダプターに固定IPアドレスを設定する",
    syntax: "New-NetIPAddress [-InterfaceAlias] <string> [-IPAddress] <string> [-PrefixLength <int>]",
    parameters: [
      { name: "-InterfaceAlias", description: "対象アダプター" },
      { name: "-IPAddress", description: "設定するIPアドレス" },
      { name: "-PrefixLength", description: "サブネットマスクの長さ（例: 24）" }
    ],
    examples: [
      { command: 'New-NetIPAddress -InterfaceAlias "イーサネット" -IPAddress "192.168.1.100" -PrefixLength 24', description: "固定IPアドレスを設定する" },
      { command: 'New-NetIPAddress -InterfaceAlias "イーサネット" -IPAddress "192.168.1.100" -PrefixLength 24 -DefaultGateway "192.168.1.1"', description: "デフォルトゲートウェイも同時に設定する" }
    ],
    tags: ["固定IP設定", "IPアドレスを設定"]
  },
  {
    id: "remove-netipaddress", name: "Remove-NetIPAddress", category: "network",
    summary: "設定した固定IPアドレスを削除する",
    syntax: "Remove-NetIPAddress [-InterfaceAlias] <string> [-IPAddress] <string>",
    parameters: [
      { name: "-InterfaceAlias", description: "対象アダプター" },
      { name: "-IPAddress", description: "削除するIPアドレス" }
    ],
    examples: [
      { command: 'Remove-NetIPAddress -InterfaceAlias "イーサネット" -IPAddress "192.168.1.100"', description: "設定した固定IPアドレスを削除する" },
      { command: 'Remove-NetIPAddress -InterfaceAlias "イーサネット" -IPAddress "192.168.1.100" -Confirm:$false', description: "確認なしでIPアドレス設定を削除する" }
    ],
    tags: ["IPアドレス削除", "固定IPを解除"]
  },
  {
    id: "get-netroute", name: "Get-NetRoute", category: "network",
    summary: "このPCのルーティングテーブル（経路情報）を取得する",
    syntax: "Get-NetRoute [[-InterfaceAlias] <string>]",
    parameters: [
      { name: "-InterfaceAlias", description: "対象アダプター" }
    ],
    examples: [
      { command: "Get-NetRoute", description: "このPCのルーティングテーブルを表示する" },
      { command: 'Get-NetRoute -DestinationPrefix "0.0.0.0/0"', description: "デフォルトゲートウェイの設定を確認する" }
    ],
    tags: ["ルーティングテーブル確認", "route print"]
  },
  {
    id: "new-netroute", name: "New-NetRoute", category: "network",
    summary: "新しいルート（通信経路）を追加する",
    syntax: "New-NetRoute [-InterfaceAlias] <string> [-DestinationPrefix] <string> [-NextHop <string>]",
    parameters: [
      { name: "-InterfaceAlias", description: "対象アダプター" },
      { name: "-DestinationPrefix", description: "宛先ネットワーク（例: 10.0.0.0/24）" },
      { name: "-NextHop", description: "ゲートウェイアドレス" }
    ],
    examples: [
      { command: 'New-NetRoute -InterfaceAlias "イーサネット" -DestinationPrefix "10.0.0.0/24" -NextHop "192.168.1.254"', description: "特定のネットワーク宛の経路（ルート）を追加する" },
      { command: 'New-NetRoute -InterfaceAlias "イーサネット" -DestinationPrefix "0.0.0.0/0" -NextHop "192.168.1.1"', description: "デフォルトゲートウェイを追加する" }
    ],
    tags: ["ルート追加", "経路を追加"]
  },
  {
    id: "remove-netroute", name: "Remove-NetRoute", category: "network",
    summary: "追加したルート（通信経路）を削除する",
    syntax: "Remove-NetRoute [-InterfaceAlias] <string> [-DestinationPrefix] <string>",
    parameters: [
      { name: "-InterfaceAlias", description: "対象アダプター" },
      { name: "-DestinationPrefix", description: "削除する宛先ネットワーク" }
    ],
    examples: [
      { command: 'Remove-NetRoute -InterfaceAlias "イーサネット" -DestinationPrefix "10.0.0.0/24"', description: "追加した経路を削除する" },
      { command: 'Remove-NetRoute -DestinationPrefix "10.0.0.0/24" -Confirm:$false', description: "確認なしで経路を削除する" }
    ],
    tags: ["ルート削除", "経路を削除"]
  },
  {
    id: "disable-netadapter", name: "Disable-NetAdapter", category: "network",
    summary: "ネットワークアダプターを無効化する",
    syntax: "Disable-NetAdapter [-Name] <string>",
    parameters: [
      { name: "-Name", description: "対象アダプター名" }
    ],
    examples: [
      { command: 'Disable-NetAdapter -Name "イーサネット" -Confirm:$false', description: "ネットワークアダプターを無効化する" },
      { command: 'Get-NetAdapter | Where-Object Status -eq "Disconnected" | Disable-NetAdapter -Confirm:$false', description: "切断状態のアダプターをまとめて無効化する" }
    ],
    tags: ["アダプター無効化", "ネットワークを切る"]
  },
  {
    id: "enable-netadapter", name: "Enable-NetAdapter", category: "network",
    summary: "無効化されているネットワークアダプターを有効化する",
    syntax: "Enable-NetAdapter [-Name] <string>",
    parameters: [
      { name: "-Name", description: "対象アダプター名" }
    ],
    examples: [
      { command: 'Enable-NetAdapter -Name "イーサネット" -Confirm:$false', description: "無効化されているアダプターを有効化する" },
      { command: 'Get-NetAdapter | Where-Object Status -eq "Disabled" | Enable-NetAdapter -Confirm:$false', description: "無効なアダプターをまとめて有効化する" }
    ],
    tags: ["アダプター有効化", "ネットワークをつなぐ"]
  },
  {
    id: "restart-netadapter", name: "Restart-NetAdapter", category: "network",
    summary: "ネットワークアダプターを再起動する（無効化してから有効化する）",
    syntax: "Restart-NetAdapter [-Name] <string>",
    parameters: [
      { name: "-Name", description: "対象アダプター名" }
    ],
    examples: [
      { command: 'Restart-NetAdapter -Name "イーサネット"', description: "ネットワークアダプターを無効化→有効化して再起動する" },
      { command: 'Restart-NetAdapter -Name "Wi-Fi" -Confirm:$false', description: "Wi-Fiアダプターを確認なしで再起動する" }
    ],
    tags: ["アダプター再起動", "ネットワークをリセット"]
  },
  {
    id: "rename-netadapter", name: "Rename-NetAdapter", category: "network",
    summary: "ネットワークアダプターの表示名を変更する",
    syntax: "Rename-NetAdapter [-Name] <string> [-NewName] <string>",
    parameters: [
      { name: "-Name", description: "現在の名前" },
      { name: "-NewName", description: "新しい名前" }
    ],
    examples: [
      { command: 'Rename-NetAdapter -Name "イーサネット" -NewName "LAN"', description: "アダプターの表示名を分かりやすい名前に変更する" },
      { command: 'Get-NetAdapter | Rename-NetAdapter -NewName "Main"', description: "パイプラインで取得したアダプターの名前を変更する" }
    ],
    tags: ["アダプター名変更", "ネットワーク名を変える"]
  },

  // ===== printer =====
  {
    id: "get-printer", name: "Get-Printer", category: "printer",
    summary: "このPCに登録されているプリンターの一覧を取得する",
    syntax: "Get-Printer [[-Name] <string[]>]",
    parameters: [
      { name: "-Name", description: "プリンター名で絞り込む" }
    ],
    examples: [
      { command: "Get-Printer", description: "このPCに登録されているプリンターの一覧を表示する" },
      { command: 'Get-Printer -Name "*PDF*"', description: "名前にPDFを含むプリンター（仮想プリンターなど）を検索する" }
    ],
    tags: ["プリンター一覧", "プリンター確認"]
  },
  {
    id: "add-printer", name: "Add-Printer", category: "printer",
    summary: "新しいプリンターを追加する",
    syntax: "Add-Printer [-Name] <string> [-DriverName <string>] [-PortName <string>]",
    parameters: [
      { name: "-Name", description: "プリンター名" },
      { name: "-DriverName", description: "使用するドライバー名" },
      { name: "-PortName", description: "接続するポート" }
    ],
    examples: [
      { command: 'Add-Printer -Name "OfficePrinter" -DriverName "HP Universal Printing PCL 6" -PortName "IP_192.168.1.50"', description: "ネットワークプリンターを追加する" },
      { command: 'Add-Printer -ConnectionName "\\\\Server\\SharedPrinter"', description: "共有プリンターに接続する" }
    ],
    tags: ["プリンター追加", "プリンターを設定"]
  },
  {
    id: "remove-printer", name: "Remove-Printer", category: "printer",
    summary: "登録済みのプリンターを削除する",
    syntax: "Remove-Printer [-Name] <string>",
    parameters: [
      { name: "-Name", description: "削除するプリンター名" }
    ],
    examples: [
      { command: 'Remove-Printer -Name "OfficePrinter"', description: "登録済みのプリンターを削除する" },
      { command: 'Get-Printer -Name "Old*" | Remove-Printer', description: "名前がOldで始まるプリンターをまとめて削除する" }
    ],
    tags: ["プリンター削除", "プリンターを消す"]
  },

  // ===== module (追加：パッケージ管理) =====
  {
    id: "get-package", name: "Get-Package", category: "module",
    summary: "PackageManagementで管理されているパッケージの一覧を取得する",
    syntax: "Get-Package [[-Name] <string>]",
    parameters: [
      { name: "-Name", description: "パッケージ名で絞り込む" }
    ],
    examples: [
      { command: "Get-Package", description: "PackageManagementで管理されているパッケージの一覧を表示する" },
      { command: 'Get-Package -Name "Az*"', description: "名前がAzで始まるパッケージを検索する" }
    ],
    tags: ["パッケージ一覧", "インストール済みパッケージ確認"]
  },
  {
    id: "find-package", name: "Find-Package", category: "module",
    summary: "インストール可能なパッケージを検索する",
    syntax: "Find-Package [-Name] <string>",
    parameters: [
      { name: "-Name", description: "検索するパッケージ名" }
    ],
    examples: [
      { command: 'Find-Package -Name "7zip"', description: "利用可能なパッケージを検索する" },
      { command: 'Find-Package -Name "7zip" -Source "chocolatey"', description: "特定のパッケージソースから検索する" }
    ],
    tags: ["パッケージ検索"]
  },
  {
    id: "install-package", name: "Install-Package", category: "module",
    summary: "パッケージをインストールする",
    syntax: "Install-Package [-Name] <string>",
    parameters: [
      { name: "-Name", description: "インストールするパッケージ名" }
    ],
    examples: [
      { command: 'Install-Package -Name "7zip"', description: "パッケージをインストールする" },
      { command: 'Install-Package -Name "7zip" -Force', description: "確認なしで強制的にインストールする" }
    ],
    tags: ["パッケージインストール"]
  },
  {
    id: "uninstall-package", name: "Uninstall-Package", category: "module",
    summary: "インストールしたパッケージを削除する",
    syntax: "Uninstall-Package [-Name] <string>",
    parameters: [
      { name: "-Name", description: "削除するパッケージ名" }
    ],
    examples: [
      { command: 'Uninstall-Package -Name "7zip"', description: "インストールしたパッケージを削除する" },
      { command: 'Get-Package -Name "Old*" | Uninstall-Package', description: "名前がOldで始まるパッケージをまとめて削除する" }
    ],
    tags: ["パッケージ削除", "アンインストール"]
  },

  // ===== remoting (追加) =====
  {
    id: "enable-psremoting", name: "Enable-PSRemoting", category: "remoting",
    summary: "このPCへのPowerShellリモート接続を有効にする",
    syntax: "Enable-PSRemoting [-Force]",
    parameters: [
      { name: "-Force", description: "確認なしで実行する" }
    ],
    examples: [
      { command: "Enable-PSRemoting -Force", description: "このPCへのPowerShellリモート接続を有効にする" },
      { command: "Enable-PSRemoting -SkipNetworkProfileCheck", description: "ネットワークプロファイルの確認をスキップして有効化する" }
    ],
    tags: ["リモート接続を有効化", "PSRemoting設定"]
  },
  {
    id: "disable-psremoting", name: "Disable-PSRemoting", category: "remoting",
    summary: "このPCへのリモート接続を無効化する",
    syntax: "Disable-PSRemoting [-Force]",
    parameters: [
      { name: "-Force", description: "確認なしで実行する" }
    ],
    examples: [
      { command: "Disable-PSRemoting -Force", description: "このPCへのリモート接続を無効化する" },
      { command: "Disable-PSRemoting", description: "確認を求めながらリモート接続を無効化する" }
    ],
    tags: ["リモート接続を無効化"]
  },
  {
    id: "test-wsman", name: "Test-WSMan", category: "remoting",
    summary: "リモート管理（WinRM）が有効かどうかを確認する",
    syntax: "Test-WSMan [[-ComputerName] <string>]",
    parameters: [
      { name: "-ComputerName", description: "接続確認する相手のPC名" }
    ],
    examples: [
      { command: "Test-WSMan -ComputerName Server01", description: "リモート管理（WinRM）が有効かどうかを確認する" },
      { command: "Test-WSMan", description: "ローカルPCのWinRMサービスが動作しているか確認する" }
    ],
    tags: ["WinRM確認", "リモート管理の疎通確認"]
  },

  // ===== system (追加) =====
  {
    id: "clear-host", name: "Clear-Host", aliases: ["cls", "clear"], category: "system",
    summary: "コンソール画面の表示内容をすべて消去する",
    syntax: "Clear-Host",
    parameters: [],
    examples: [
      { command: "Clear-Host", description: "コンソール画面の表示内容をすべて消去する（clsと同じ）" },
      { command: "cls", description: "Clear-Hostの組み込みエイリアスを使って画面をクリアする" }
    ],
    tags: ["画面クリア", "cls", "画面を消す"]
  },
  {
    id: "get-timezone", name: "Get-TimeZone", category: "system",
    summary: "現在設定されているタイムゾーンを取得する",
    syntax: "Get-TimeZone [-ListAvailable]",
    parameters: [
      { name: "-ListAvailable", description: "設定可能なタイムゾーンを一覧表示する" }
    ],
    examples: [
      { command: "Get-TimeZone", description: "現在設定されているタイムゾーンを表示する" },
      { command: "Get-TimeZone -ListAvailable", description: "設定可能なタイムゾーンの一覧を表示する" }
    ],
    tags: ["タイムゾーン確認"]
  },
  {
    id: "set-timezone", name: "Set-TimeZone", category: "system",
    summary: "システムのタイムゾーンを変更する",
    syntax: "Set-TimeZone [-Id] <string>",
    parameters: [
      { name: "-Id", description: '設定するタイムゾーンのID（例: "Tokyo Standard Time"）' }
    ],
    examples: [
      { command: 'Set-TimeZone -Id "Tokyo Standard Time"', description: "タイムゾーンを日本標準時に設定する" },
      { command: 'Get-TimeZone -ListAvailable | Where-Object Id -like "*Tokyo*"', description: "設定したいタイムゾーンのIDを検索してから設定する" }
    ],
    tags: ["タイムゾーン変更", "時刻設定"]
  },
  {
    id: "get-uiculture", name: "Get-UICulture", category: "system",
    summary: "PowerShellの表示言語（UIカルチャ）設定を取得する",
    syntax: "Get-UICulture",
    parameters: [],
    examples: [
      { command: "Get-UICulture", description: "PowerShellの表示言語（UIカルチャ）設定を確認する" },
      { command: "(Get-UICulture).Name", description: "言語コード（例: ja-JP）だけを取得する" }
    ],
    tags: ["表示言語確認", "UIカルチャ確認"]
  },
  {
    id: "start-sleep", name: "Start-Sleep", aliases: ["sleep"], category: "system",
    summary: "指定した時間だけ処理を一時停止する",
    syntax: "Start-Sleep [-Seconds] <int>",
    parameters: [
      { name: "-Seconds", description: "待機する秒数" },
      { name: "-Milliseconds", description: "待機するミリ秒数" }
    ],
    examples: [
      { command: "Start-Sleep -Seconds 5", description: "5秒間処理を一時停止する" },
      { command: "1..3 | ForEach-Object { Write-Host $_; Start-Sleep -Seconds 1 }", description: "1秒ごとにカウントを表示する" }
    ],
    tags: ["待機", "一時停止", "スリープ"]
  },
  {
    id: "get-wmiobject", name: "Get-WmiObject", category: "system",
    summary: "WMI（旧方式）を使ってPCのシステム情報を取得する",
    syntax: "Get-WmiObject [-Class] <string>",
    parameters: [
      { name: "-Class", description: "取得するWMIクラス名" }
    ],
    examples: [
      { command: "Get-WmiObject -Class Win32_OperatingSystem", description: "OS情報をWMI経由で取得する（Get-CimInstanceの旧方式）" },
      { command: "Get-WmiObject -Class Win32_BIOS", description: "BIOS情報を取得する" }
    ],
    tags: ["WMI情報取得（旧方式）", "レガシーWMIコマンド"]
  },

  // ===== dataio (追加) =====
  {
    id: "format-hex", name: "Format-Hex", category: "dataio",
    summary: "ファイルや文字列の内容を16進数（バイナリ）表示にする",
    syntax: "Format-Hex [-Path] <string>",
    parameters: [
      { name: "-Path", description: "対象ファイルのパス" }
    ],
    examples: [
      { command: 'Format-Hex -Path "sample.bin"', description: "ファイルの内容を16進数（バイナリ）表示する" },
      { command: '"abc" | Format-Hex', description: "文字列をバイト単位の16進数表示に変換する" }
    ],
    tags: ["16進数表示", "バイナリを見る", "hexdump"]
  },
  {
    id: "convertto-html", name: "ConvertTo-Html", category: "dataio",
    summary: "オブジェクトをHTML形式に変換する",
    syntax: "ConvertTo-Html [-Property] <string[]>",
    parameters: [
      { name: "-Property", description: "表示するプロパティ" }
    ],
    examples: [
      { command: 'Get-Process | ConvertTo-Html -Property Name, CPU | Out-File "process.html"', description: "プロセス一覧をHTML形式のレポートとして保存する" },
      { command: 'Get-Service | ConvertTo-Html | Out-File "service.html"', description: "サービス一覧をHTMLファイルとして出力する" }
    ],
    tags: ["HTML変換", "HTMLレポート作成"]
  },
  {
    id: "select-xml", name: "Select-Xml", category: "dataio",
    summary: "XMLファイルから、指定した条件（XPath）に合う要素を検索する",
    syntax: "Select-Xml [-Path] <string> [-XPath] <string>",
    parameters: [
      { name: "-Path", description: "対象のXMLファイル" },
      { name: "-XPath", description: "検索するXPath式" }
    ],
    examples: [
      { command: 'Select-Xml -Path "data.xml" -XPath "//item"', description: "XMLファイルから特定の要素を検索する" },
      { command: "Select-Xml -Path \"config.xml\" -XPath \"//setting[@name='timeout']\"", description: "特定の属性を持つ要素を検索する" }
    ],
    tags: ["XML検索", "XMLから抜き出す", "XPath"]
  },
  {
    id: "convertto-xml", name: "ConvertTo-Xml", category: "dataio",
    summary: "オブジェクトをXML形式に変換する",
    syntax: "ConvertTo-Xml [-InputObject] <object> [-As <string>]",
    parameters: [
      { name: "-InputObject", description: "変換するオブジェクト" },
      { name: "-As", description: "出力形式（既定はXmlDocument）" }
    ],
    examples: [
      { command: "Get-Process | Select-Object -First 3 | ConvertTo-Xml -As String", description: "プロセス情報をXML形式の文字列に変換する" },
      { command: "Get-Service | ConvertTo-Xml | Select-Object -ExpandProperty OuterXml", description: "XML文書として出力しテキストを取り出す" }
    ],
    tags: ["XML変換", "XMLに変換"]
  },
  {
    id: "convertfrom-stringdata", name: "ConvertFrom-StringData", category: "dataio",
    summary: "key=value形式のテキストを、ハッシュテーブルに変換する",
    syntax: "ConvertFrom-StringData [-StringData] <string>",
    parameters: [
      { name: "-StringData", description: "key=value形式の文字列" }
    ],
    examples: [
      { command: 'ConvertFrom-StringData -StringData "Name=Taro`nAge=30"', description: "key=value形式のテキストをハッシュテーブルに変換する" },
      { command: 'Get-Content "settings.txt" -Raw | ConvertFrom-StringData', description: "設定ファイルをハッシュテーブルとして読み込む" }
    ],
    tags: ["key=value変換", "設定ファイル読み込み", "ハッシュテーブル化"]
  },

  // ===== pipeline (追加) =====
  {
    id: "tee-object", name: "Tee-Object", category: "pipeline",
    summary: "パイプラインの結果をファイルや変数に保存しつつ、そのまま次の処理にも渡す",
    syntax: "Command | Tee-Object -FilePath <string>",
    parameters: [
      { name: "-FilePath", description: "保存先ファイル" },
      { name: "-Variable", description: "保存先の変数名" }
    ],
    examples: [
      { command: 'Get-Process | Tee-Object -FilePath "process.txt" | Where-Object CPU -gt 100', description: "結果をファイルに保存しつつ、そのまま次の処理にも渡す" },
      { command: "Get-Service | Tee-Object -Variable svcResult | Format-Table", description: "結果を変数に保存しつつ画面にも表示する" }
    ],
    tags: ["結果を保存しつつ次に渡す", "分岐出力"]
  },

  // ===== interaction =====
  {
    id: "read-host", name: "Read-Host", category: "interaction",
    summary: "ユーザーにキーボードからの入力を求め、その内容を受け取る",
    syntax: "Read-Host [-Prompt] <string> [-AsSecureString]",
    parameters: [
      { name: "-Prompt", description: "表示する質問文" },
      { name: "-AsSecureString", description: "入力内容を画面に表示せず、セキュアな形式で受け取る" }
    ],
    examples: [
      { command: '$name = Read-Host "名前を入力してください"', description: "ユーザーに入力を求め、結果を変数に保存する" },
      { command: '$pw = Read-Host "パスワードを入力してください" -AsSecureString', description: "パスワードなど、画面に表示せずに入力を受け取る" }
    ],
    tags: ["ユーザー入力", "キーボード入力を受け取る", "プロンプト表示"]
  },
  {
    id: "out-gridview", name: "Out-GridView", aliases: ["ogv"], category: "interaction",
    summary: "結果を並べ替え・絞り込みができるウィンドウ（GUI）で表示する",
    syntax: "Command | Out-GridView [-Title <string>] [-PassThru]",
    parameters: [
      { name: "-Title", description: "ウィンドウのタイトル" },
      { name: "-PassThru", description: "選択した項目を後続の処理に渡す" }
    ],
    examples: [
      { command: "Get-Process | Out-GridView", description: "プロセス一覧を並べ替え・絞り込みができるウィンドウで表示する" },
      { command: "Get-Service | Out-GridView -PassThru | Start-Service", description: "ウィンドウでサービスを選んでから開始する" }
    ],
    tags: ["表形式ウィンドウ表示", "GUIで選択", "一覧をウィンドウで見る"]
  },
  {
    id: "show-command", name: "Show-Command", category: "interaction",
    summary: "コマンドのパラメーターを入力できるGUIフォームを表示する",
    syntax: "Show-Command [-Name] <string>",
    parameters: [
      { name: "-Name", description: "表示するコマンド名" }
    ],
    examples: [
      { command: "Show-Command -Name Get-ChildItem", description: "コマンドのパラメーターをGUIフォームで入力できるウィンドウを表示する" },
      { command: "Show-Command", description: "すべてのコマンドから選んでGUIで実行できるウィンドウを開く" }
    ],
    tags: ["GUIでコマンド入力", "パラメーター入力フォーム"]
  },
  {
    id: "get-clipboard", name: "Get-Clipboard", category: "interaction",
    summary: "現在クリップボードにコピーされているテキストを取得する",
    syntax: "Get-Clipboard",
    parameters: [],
    examples: [
      { command: "Get-Clipboard", description: "現在クリップボードにコピーされているテキストを取得する" },
      { command: "$text = Get-Clipboard", description: "クリップボードの内容を変数に保存する" }
    ],
    tags: ["クリップボード取得", "コピー内容を取得"]
  },
  {
    id: "set-clipboard", name: "Set-Clipboard", category: "interaction",
    summary: "指定した内容をクリップボードにコピーする",
    syntax: "Set-Clipboard [-Value] <string>",
    parameters: [
      { name: "-Value", description: "クリップボードに設定する内容" }
    ],
    examples: [
      { command: 'Set-Clipboard -Value "こんにちは"', description: "指定した文字列をクリップボードにコピーする" },
      { command: 'Get-Content "memo.txt" | Set-Clipboard', description: "ファイルの内容をそのままクリップボードにコピーする" }
    ],
    tags: ["クリップボードにコピー", "クリップボード設定"]
  },

  // ===== bitlocker =====
  {
    id: "get-bitlockervolume", name: "Get-BitLockerVolume", category: "bitlocker",
    summary: "各ドライブのBitLocker暗号化状態を取得する",
    syntax: "Get-BitLockerVolume [[-MountPoint] <string>]",
    parameters: [
      { name: "-MountPoint", description: "対象ドライブ（例: C:）" }
    ],
    examples: [
      { command: "Get-BitLockerVolume", description: "各ドライブのBitLocker暗号化状態を確認する" },
      { command: 'Get-BitLockerVolume -MountPoint "C:"', description: "Cドライブの暗号化状態を確認する" }
    ],
    tags: ["BitLocker状態確認", "暗号化状態確認"]
  },
  {
    id: "enable-bitlocker", name: "Enable-BitLocker", category: "bitlocker",
    summary: "ドライブのBitLocker暗号化を有効にする",
    syntax: "Enable-BitLocker [-MountPoint] <string> [-RecoveryPasswordProtector]",
    parameters: [
      { name: "-MountPoint", description: "暗号化するドライブ" },
      { name: "-RecoveryPasswordProtector", description: "回復パスワードを発行する" }
    ],
    examples: [
      { command: 'Enable-BitLocker -MountPoint "D:" -RecoveryPasswordProtector', description: "Dドライブの暗号化を有効にし、回復パスワードを発行する" },
      { command: 'Enable-BitLocker -MountPoint "C:" -UsedSpaceOnly -RecoveryPasswordProtector', description: "使用済み領域だけを暗号化して高速化する" }
    ],
    tags: ["BitLocker有効化", "ドライブ暗号化", "暗号化を開始"]
  },
  {
    id: "disable-bitlocker", name: "Disable-BitLocker", category: "bitlocker",
    summary: "ドライブのBitLocker暗号化を無効化する",
    syntax: "Disable-BitLocker [-MountPoint] <string>",
    parameters: [
      { name: "-MountPoint", description: "対象ドライブ" }
    ],
    examples: [
      { command: 'Disable-BitLocker -MountPoint "D:"', description: "ドライブの暗号化を無効化し、復号を開始する" },
      { command: "Get-BitLockerVolume | Disable-BitLocker", description: "すべてのドライブの暗号化を無効化する" }
    ],
    tags: ["BitLocker無効化", "暗号化を解除"]
  },
  {
    id: "lock-bitlocker", name: "Lock-BitLocker", category: "bitlocker",
    summary: "暗号化されたドライブをロックし、アクセスできない状態にする",
    syntax: "Lock-BitLocker [-MountPoint] <string>",
    parameters: [
      { name: "-MountPoint", description: "対象ドライブ" }
    ],
    examples: [
      { command: 'Lock-BitLocker -MountPoint "D:"', description: "暗号化されたドライブをロックし、アクセスできない状態にする" },
      { command: 'Lock-BitLocker -MountPoint "D:" -ForceDismount', description: "使用中でも強制的にロックする" }
    ],
    tags: ["BitLockerロック", "ドライブをロック"]
  },
  {
    id: "unlock-bitlocker", name: "Unlock-BitLocker", category: "bitlocker",
    summary: "ロックされたBitLockerドライブのロックを解除する",
    syntax: "Unlock-BitLocker [-MountPoint] <string> [-Password <securestring>]",
    parameters: [
      { name: "-MountPoint", description: "対象ドライブ" },
      { name: "-Password", description: "解除用のパスワード" }
    ],
    examples: [
      { command: 'Unlock-BitLocker -MountPoint "D:" -Password (Read-Host -AsSecureString "パスワード")', description: "パスワードを入力してドライブのロックを解除する" },
      { command: 'Unlock-BitLocker -MountPoint "D:" -RecoveryPassword "123456-123456-123456-123456-123456-123456-123456-123456"', description: "回復パスワードを使ってロックを解除する" }
    ],
    tags: ["BitLocker解除", "ドライブのロック解除"]
  },

  // ===== hyperv =====
  {
    id: "get-vm", name: "Get-VM", category: "hyperv",
    summary: "Hyper-Vホスト上の仮想マシンの一覧と状態を取得する",
    syntax: "Get-VM [[-Name] <string[]>]",
    parameters: [
      { name: "-Name", description: "仮想マシン名で絞り込む" }
    ],
    examples: [
      { command: "Get-VM", description: "このホスト上の仮想マシンの一覧と状態を表示する" },
      { command: 'Get-VM -Name "TestVM"', description: "特定の仮想マシンの状態を確認する" }
    ],
    tags: ["仮想マシン一覧", "VM確認", "Hyper-V確認"]
  },
  {
    id: "start-vm", name: "Start-VM", category: "hyperv",
    summary: "Hyper-Vの仮想マシンを起動する",
    syntax: "Start-VM [-Name] <string>",
    parameters: [
      { name: "-Name", description: "起動する仮想マシン名" }
    ],
    examples: [
      { command: 'Start-VM -Name "TestVM"', description: "仮想マシンを起動する" },
      { command: 'Get-VM | Where-Object State -eq "Off" | Start-VM', description: "停止中のすべての仮想マシンを起動する" }
    ],
    tags: ["仮想マシン起動", "VMを起動"]
  },
  {
    id: "stop-vm", name: "Stop-VM", category: "hyperv",
    summary: "Hyper-Vの仮想マシンを停止する",
    syntax: "Stop-VM [-Name] <string> [-Force]",
    parameters: [
      { name: "-Name", description: "停止する仮想マシン名" },
      { name: "-Force", description: "強制停止する" }
    ],
    examples: [
      { command: 'Stop-VM -Name "TestVM"', description: "仮想マシンをシャットダウンする" },
      { command: 'Stop-VM -Name "TestVM" -Force', description: "応答がない仮想マシンを強制停止する" }
    ],
    tags: ["仮想マシン停止", "VMを止める", "VMシャットダウン"]
  },
  {
    id: "new-vm", name: "New-VM", category: "hyperv",
    summary: "新しいHyper-V仮想マシンを作成する",
    syntax: "New-VM [-Name] <string> [-MemoryStartupBytes <int64>] [-NewVHDPath <string>]",
    parameters: [
      { name: "-Name", description: "作成する仮想マシン名" },
      { name: "-MemoryStartupBytes", description: "起動時に割り当てるメモリ量" },
      { name: "-NewVHDPath", description: "新規作成する仮想ディスクのパス" }
    ],
    examples: [
      { command: 'New-VM -Name "TestVM" -MemoryStartupBytes 2GB -NewVHDPath "D:\\VMs\\TestVM.vhdx" -NewVHDSizeBytes 60GB', description: "メモリ2GB・ディスク60GBの新しい仮想マシンを作成する" },
      { command: 'New-VM -Name "TestVM" -Generation 2', description: "第2世代の仮想マシンを作成する" }
    ],
    tags: ["仮想マシン作成", "VMを新規作成"]
  },
  {
    id: "remove-vm", name: "Remove-VM", category: "hyperv",
    summary: "Hyper-V仮想マシンの構成を削除する",
    syntax: "Remove-VM [-Name] <string> [-Force]",
    parameters: [
      { name: "-Name", description: "削除する仮想マシン名" },
      { name: "-Force", description: "確認なしで削除する" }
    ],
    examples: [
      { command: 'Remove-VM -Name "TestVM" -Force', description: "仮想マシンの構成を削除する（仮想ディスクは別途削除が必要）" },
      { command: 'Get-VM -Name "Test*" | Remove-VM -Force', description: "名前がTestで始まる仮想マシンをまとめて削除する" }
    ],
    tags: ["仮想マシン削除", "VMを消す"]
  },

  // ===== winfeature =====
  {
    id: "get-windowsoptionalfeature", name: "Get-WindowsOptionalFeature", category: "winfeature",
    summary: "有効/無効にできるWindowsの機能一覧を取得する",
    syntax: "Get-WindowsOptionalFeature -Online [[-FeatureName] <string>]",
    parameters: [
      { name: "-Online", description: "実行中のWindowsを対象にする" },
      { name: "-FeatureName", description: "機能名で絞り込む" }
    ],
    examples: [
      { command: "Get-WindowsOptionalFeature -Online", description: "有効/無効にできるWindowsの機能一覧を表示する" },
      { command: 'Get-WindowsOptionalFeature -Online -FeatureName "*Hyper-V*"', description: "Hyper-V関連の機能の状態を確認する" }
    ],
    tags: ["Windows機能一覧", "オプション機能確認"]
  },
  {
    id: "enable-windowsoptionalfeature", name: "Enable-WindowsOptionalFeature", category: "winfeature",
    summary: "Windowsのオプション機能を有効化する",
    syntax: "Enable-WindowsOptionalFeature -Online [-FeatureName] <string>",
    parameters: [
      { name: "-Online", description: "実行中のWindowsを対象にする" },
      { name: "-FeatureName", description: "有効化する機能名" }
    ],
    examples: [
      { command: 'Enable-WindowsOptionalFeature -Online -FeatureName "Microsoft-Hyper-V-All"', description: "Hyper-V機能を有効化する（再起動が必要な場合がある）" },
      { command: 'Enable-WindowsOptionalFeature -Online -FeatureName "TelnetClient" -All', description: "Telnetクライアント機能を有効化する" }
    ],
    tags: ["Windows機能を有効化", "オプション機能を追加"]
  },
  {
    id: "disable-windowsoptionalfeature", name: "Disable-WindowsOptionalFeature", category: "winfeature",
    summary: "Windowsのオプション機能を無効化する",
    syntax: "Disable-WindowsOptionalFeature -Online [-FeatureName] <string>",
    parameters: [
      { name: "-Online", description: "実行中のWindowsを対象にする" },
      { name: "-FeatureName", description: "無効化する機能名" }
    ],
    examples: [
      { command: 'Disable-WindowsOptionalFeature -Online -FeatureName "TelnetClient"', description: "使用していない機能を無効化する" },
      { command: 'Disable-WindowsOptionalFeature -Online -FeatureName "Microsoft-Hyper-V-All" -NoRestart', description: "再起動せずに機能を無効化する" }
    ],
    tags: ["Windows機能を無効化", "オプション機能を削除"]
  },

  // ===== activedirectory =====
  {
    id: "get-aduser", name: "Get-ADUser", category: "activedirectory",
    summary: "Active Directoryのユーザーアカウントの情報を取得する",
    syntax: "Get-ADUser [-Identity] <string> | [-Filter] <string>",
    parameters: [
      { name: "-Identity", description: "対象ユーザーのアカウント名" },
      { name: "-Filter", description: "検索条件" }
    ],
    examples: [
      { command: 'Get-ADUser -Identity "tanaka"', description: "特定のADユーザーの情報を取得する" },
      { command: "Get-ADUser -Filter \"Department -eq '営業部'\"", description: "部署名で条件を指定してユーザーを検索する" }
    ],
    tags: ["ADユーザー確認", "Active Directoryユーザー検索"]
  },
  {
    id: "new-aduser", name: "New-ADUser", category: "activedirectory",
    summary: "新しいActive Directoryユーザーアカウントを作成する",
    syntax: "New-ADUser [-Name] <string> [-SamAccountName <string>] [-Enabled <bool>]",
    parameters: [
      { name: "-Name", description: "表示名" },
      { name: "-SamAccountName", description: "ログオン名" },
      { name: "-Enabled", description: "アカウントを有効にするか" }
    ],
    examples: [
      { command: 'New-ADUser -Name "田中太郎" -SamAccountName "tanaka" -Enabled $true', description: "新しいADユーザーアカウントを作成する" },
      { command: 'New-ADUser -Name "田中太郎" -SamAccountName "tanaka" -Path "OU=Sales,DC=example,DC=com"', description: "特定の組織単位（OU）にユーザーを作成する" }
    ],
    tags: ["ADユーザー作成", "新しいアカウントを作成"]
  },
  {
    id: "set-aduser", name: "Set-ADUser", category: "activedirectory",
    summary: "既存のActive Directoryユーザーの属性を変更する",
    syntax: "Set-ADUser [-Identity] <string> [-Department <string>] [-Enabled <bool>]",
    parameters: [
      { name: "-Identity", description: "対象ユーザー" },
      { name: "-Department", description: "部署名などの属性" },
      { name: "-Enabled", description: "有効/無効の切り替え" }
    ],
    examples: [
      { command: 'Set-ADUser -Identity "tanaka" -Department "営業部"', description: "ユーザーの部署属性を変更する" },
      { command: 'Set-ADUser -Identity "tanaka" -Enabled $false', description: "ユーザーアカウントを無効化する" }
    ],
    tags: ["ADユーザー編集", "ユーザー情報を変更"]
  },
  {
    id: "remove-aduser", name: "Remove-ADUser", category: "activedirectory",
    summary: "Active Directoryユーザーアカウントを削除する",
    syntax: "Remove-ADUser [-Identity] <string>",
    parameters: [
      { name: "-Identity", description: "削除するユーザー" }
    ],
    examples: [
      { command: 'Remove-ADUser -Identity "tanaka" -Confirm:$false', description: "ADユーザーを削除する" },
      { command: 'Get-ADUser -Filter "Enabled -eq $false" | Remove-ADUser -Confirm:$false', description: "無効化されているユーザーをまとめて削除する" }
    ],
    tags: ["ADユーザー削除"]
  },
  {
    id: "get-adgroup", name: "Get-ADGroup", category: "activedirectory",
    summary: "Active Directoryグループの情報を取得する",
    syntax: "Get-ADGroup [-Identity] <string> | [-Filter] <string>",
    parameters: [
      { name: "-Identity", description: "対象グループ" },
      { name: "-Filter", description: "検索条件" }
    ],
    examples: [
      { command: 'Get-ADGroup -Identity "営業部"', description: "特定のADグループの情報を取得する" },
      { command: 'Get-ADGroup -Filter "*"', description: "すべてのADグループを一覧表示する" }
    ],
    tags: ["ADグループ確認"]
  },
  {
    id: "add-adgroupmember", name: "Add-ADGroupMember", category: "activedirectory",
    summary: "Active Directoryグループにユーザーを追加する",
    syntax: "Add-ADGroupMember [-Identity] <string> [-Members] <string[]>",
    parameters: [
      { name: "-Identity", description: "対象グループ" },
      { name: "-Members", description: "追加するユーザー" }
    ],
    examples: [
      { command: 'Add-ADGroupMember -Identity "営業部" -Members "tanaka"', description: "ADユーザーをグループに追加する" },
      { command: 'Add-ADGroupMember -Identity "営業部" -Members "tanaka","suzuki"', description: "複数のユーザーを一度に追加する" }
    ],
    tags: ["ADグループにメンバー追加"]
  },
  {
    id: "get-adcomputer", name: "Get-ADComputer", category: "activedirectory",
    summary: "ドメインに参加しているコンピューターの情報を取得する",
    syntax: "Get-ADComputer [-Identity] <string> | [-Filter] <string>",
    parameters: [
      { name: "-Identity", description: "対象コンピューター名" },
      { name: "-Filter", description: "検索条件" }
    ],
    examples: [
      { command: 'Get-ADComputer -Identity "PC001"', description: "ドメインに参加している特定のPCの情報を取得する" },
      { command: "Get-ADComputer -Filter \"*\" | Select-Object Name", description: "ドメインに参加しているすべてのPC名を一覧表示する" }
    ],
    tags: ["ADコンピューター確認", "ドメイン参加PC一覧"]
  },
  {
    id: "search-adaccount", name: "Search-ADAccount", category: "activedirectory",
    summary: "ロックされたアカウントやパスワード期限切れのアカウントを検索する",
    syntax: "Search-ADAccount -LockedOut | -AccountExpired | -PasswordExpired",
    parameters: [
      { name: "-LockedOut", description: "ロックされたアカウントを検索する" },
      { name: "-PasswordExpired", description: "パスワードが期限切れのアカウントを検索する" }
    ],
    examples: [
      { command: "Search-ADAccount -LockedOut", description: "ロックされているアカウントを検索する" },
      { command: "Search-ADAccount -PasswordExpired -UsersOnly", description: "パスワードが期限切れのユーザーを検索する" }
    ],
    tags: ["ロックされたアカウント検索", "パスワード期限切れ確認"]
  },
  {
    id: "set-adaccountpassword", name: "Set-ADAccountPassword", category: "activedirectory",
    summary: "Active Directoryアカウントのパスワードをリセットする",
    syntax: "Set-ADAccountPassword [-Identity] <string> [-NewPassword <securestring>]",
    parameters: [
      { name: "-Identity", description: "対象アカウント" },
      { name: "-NewPassword", description: "新しいパスワード" }
    ],
    examples: [
      { command: 'Set-ADAccountPassword -Identity "tanaka" -NewPassword (Read-Host -AsSecureString "新しいパスワード")', description: "ADユーザーのパスワードをリセットする" },
      { command: 'Set-ADAccountPassword -Identity "tanaka" -Reset -NewPassword (ConvertTo-SecureString "P@ssw0rd!" -AsPlainText -Force)', description: "パスワードを指定した値にリセットする" }
    ],
    tags: ["ADパスワードリセット", "パスワードを変更"]
  },

  // ===== device =====
  {
    id: "get-pnpdevice", name: "Get-PnpDevice", category: "device",
    summary: "接続されているプラグアンドプレイデバイスの一覧を取得する",
    syntax: "Get-PnpDevice [[-Class] <string>]",
    parameters: [
      { name: "-Class", description: "デバイスの種類で絞り込む（例: Printer, USB）" }
    ],
    examples: [
      { command: "Get-PnpDevice", description: "接続されているプラグアンドプレイデバイスの一覧を表示する" },
      { command: "Get-PnpDevice -Class USB", description: "USB関連のデバイスだけを表示する" }
    ],
    tags: ["デバイス一覧", "デバイスマネージャー", "接続機器確認"]
  },
  {
    id: "enable-pnpdevice", name: "Enable-PnpDevice", category: "device",
    summary: "無効化されているデバイスを有効化する",
    syntax: "Enable-PnpDevice [-InstanceId] <string>",
    parameters: [
      { name: "-InstanceId", description: "対象デバイスのID（Get-PnpDeviceで取得）" }
    ],
    examples: [
      { command: 'Get-PnpDevice -FriendlyName "*Bluetooth*" | Enable-PnpDevice -Confirm:$false', description: "無効化されているBluetoothデバイスを有効化する" },
      { command: 'Enable-PnpDevice -InstanceId "USB\\VID_0001&PID_0002\\..." -Confirm:$false', description: "特定のデバイスIDを指定して有効化する" }
    ],
    tags: ["デバイス有効化", "無効化したデバイスを戻す"]
  },
  {
    id: "disable-pnpdevice", name: "Disable-PnpDevice", category: "device",
    summary: "指定したデバイスを無効化する",
    syntax: "Disable-PnpDevice [-InstanceId] <string>",
    parameters: [
      { name: "-InstanceId", description: "対象デバイスのID" }
    ],
    examples: [
      { command: 'Get-PnpDevice -FriendlyName "*Webcam*" | Disable-PnpDevice -Confirm:$false', description: "内蔵カメラなどのデバイスを無効化する" },
      { command: 'Disable-PnpDevice -InstanceId "USB\\VID_0001&PID_0002\\..." -Confirm:$false', description: "特定のデバイスIDを指定して無効化する" }
    ],
    tags: ["デバイス無効化", "デバイスを止める"]
  },

  // ===== debug =====
  {
    id: "set-psbreakpoint", name: "Set-PSBreakpoint", category: "debug",
    summary: "スクリプトの特定の行やコマンドにブレークポイント（一時停止ポイント）を設定する",
    syntax: "Set-PSBreakpoint [-Script] <string> [-Line] <int>",
    parameters: [
      { name: "-Script", description: "対象スクリプトファイル" },
      { name: "-Line", description: "ブレークポイントを設定する行番号" }
    ],
    examples: [
      { command: 'Set-PSBreakpoint -Script "script.ps1" -Line 10', description: "スクリプトの10行目にブレークポイントを設定する" },
      { command: 'Set-PSBreakpoint -Script "script.ps1" -Command "Get-Process"', description: "特定のコマンドが呼ばれたときに止まるようにする" }
    ],
    tags: ["ブレークポイント設定", "デバッグ", "スクリプトを一時停止"]
  },
  {
    id: "get-psbreakpoint", name: "Get-PSBreakpoint", category: "debug",
    summary: "現在設定されているブレークポイントの一覧を取得する",
    syntax: "Get-PSBreakpoint",
    parameters: [],
    examples: [
      { command: "Get-PSBreakpoint", description: "現在設定されているブレークポイントの一覧を表示する" },
      { command: 'Get-PSBreakpoint -Script "script.ps1"', description: "特定のスクリプトのブレークポイントだけを表示する" }
    ],
    tags: ["ブレークポイント確認"]
  },
  {
    id: "remove-psbreakpoint", name: "Remove-PSBreakpoint", category: "debug",
    summary: "設定済みのブレークポイントを削除する",
    syntax: "Remove-PSBreakpoint [-Breakpoint] <Breakpoint[]>",
    parameters: [
      { name: "-Breakpoint", description: "削除するブレークポイント（Get-PSBreakpointの結果など）" }
    ],
    examples: [
      { command: "Get-PSBreakpoint | Remove-PSBreakpoint", description: "すべてのブレークポイントを削除する" },
      { command: 'Get-PSBreakpoint -Script "script.ps1" | Remove-PSBreakpoint', description: "特定のスクリプトのブレークポイントだけを削除する" }
    ],
    tags: ["ブレークポイント削除"]
  },
  {
    id: "set-psdebug", name: "Set-PSDebug", category: "debug",
    summary: "スクリプトの実行内容を1行ずつ表示・確認する、トレース／ステップモードを設定する",
    syntax: "Set-PSDebug [-Trace <int>] [-Step]",
    parameters: [
      { name: "-Trace", description: "実行される各行を表示するレベル（0～2）" },
      { name: "-Step", description: "1行ごとに確認しながら実行する" }
    ],
    examples: [
      { command: "Set-PSDebug -Trace 1", description: "スクリプトの実行行を1行ずつ画面に表示しながら実行する" },
      { command: "Set-PSDebug -Off", description: "トレース・ステップモードを解除する" }
    ],
    tags: ["トレース実行", "ステップ実行", "デバッグモード"]
  },

  // ===== event =====
  {
    id: "start-transcript", name: "Start-Transcript", category: "event",
    summary: "これ以降のコンソール操作をすべてファイルに記録する",
    syntax: "Start-Transcript [-Path] <string>",
    parameters: [
      { name: "-Path", description: "記録するファイルパス" }
    ],
    examples: [
      { command: 'Start-Transcript -Path "session.log"', description: "これ以降のコンソール操作をすべてファイルに記録する" },
      { command: 'Start-Transcript -Path "session.log" -Append', description: "既存のログファイルに追記する形で記録する" }
    ],
    tags: ["操作記録", "セッションを記録", "ログを取る"]
  },
  {
    id: "stop-transcript", name: "Stop-Transcript", category: "event",
    summary: "Start-Transcriptで開始した操作記録を終了する",
    syntax: "Stop-Transcript",
    parameters: [],
    examples: [
      { command: "Stop-Transcript", description: "Start-Transcriptで開始した記録を終了する" },
      { command: 'Start-Transcript -Path "log.txt"; Get-Process; Stop-Transcript', description: "記録を開始し、コマンドを実行して、記録を終了する一連の流れ" }
    ],
    tags: ["記録終了", "ログ記録を止める"]
  },
  {
    id: "register-objectevent", name: "Register-ObjectEvent", category: "event",
    summary: ".NETオブジェクトが発生させるイベントを監視し、発生時に処理を実行する",
    syntax: "Register-ObjectEvent [-InputObject] <object> [-EventName] <string> [-Action <scriptblock>]",
    parameters: [
      { name: "-InputObject", description: "イベントを発生させるオブジェクト" },
      { name: "-EventName", description: "監視するイベント名" },
      { name: "-Action", description: "発生時に実行する処理" }
    ],
    examples: [
      { command: '$watcher = New-Object System.IO.FileSystemWatcher "C:\\work"\nRegister-ObjectEvent $watcher Created -Action { Write-Host "ファイルが作成されました" }', description: "フォルダにファイルが作成されたら通知する" },
      { command: "Register-ObjectEvent -InputObject $timer -EventName Elapsed -Action { Write-Host \"タイマー発火\" }", description: "タイマーオブジェクトのイベントを監視する" }
    ],
    tags: ["イベント監視", "ファイル監視", "イベント駆動処理"]
  },
  {
    id: "get-eventsubscriber", name: "Get-EventSubscriber", category: "event",
    summary: "現在登録されているイベント監視の一覧を取得する",
    syntax: "Get-EventSubscriber",
    parameters: [],
    examples: [
      { command: "Get-EventSubscriber", description: "現在登録されているイベント監視の一覧を表示する" },
      { command: "Get-EventSubscriber | Select-Object SubscriptionId, EventName", description: "登録済みイベントのIDと種類を確認する" }
    ],
    tags: ["イベント監視一覧", "登録済みイベント確認"]
  },
  {
    id: "unregister-event", name: "Unregister-Event", category: "event",
    summary: "登録済みのイベント監視を解除する",
    syntax: "Unregister-Event [-SubscriptionId] <int32>",
    parameters: [
      { name: "-SubscriptionId", description: "解除するイベント監視のID" }
    ],
    examples: [
      { command: "Unregister-Event -SubscriptionId 1", description: "指定したIDのイベント監視を解除する" },
      { command: "Get-EventSubscriber | Unregister-Event", description: "すべてのイベント監視を解除する" }
    ],
    tags: ["イベント監視解除"]
  },
  {
    id: "wait-event", name: "Wait-Event", category: "event",
    summary: "指定したイベントが発生するまで処理を停止して待つ",
    syntax: "Wait-Event [[-SourceIdentifier] <string>] [-Timeout <int>]",
    parameters: [
      { name: "-SourceIdentifier", description: "待機するイベント名" },
      { name: "-Timeout", description: "最大待機秒数" }
    ],
    examples: [
      { command: 'Wait-Event -SourceIdentifier "MyEvent"', description: "指定したイベントが発生するまで処理を停止して待つ" },
      { command: "Wait-Event -Timeout 30", description: "最大30秒だけ何らかのイベントの発生を待つ" }
    ],
    tags: ["イベント待機", "イベント発生を待つ"]
  },
  {
    id: "new-event", name: "New-Event", category: "event",
    summary: "独自のイベントを発生させる",
    syntax: "New-Event [-SourceIdentifier] <string> [-MessageData <object>]",
    parameters: [
      { name: "-SourceIdentifier", description: "発生させるイベント名" },
      { name: "-MessageData", description: "イベントに含める情報" }
    ],
    examples: [
      { command: 'New-Event -SourceIdentifier "MyEvent" -MessageData "処理完了"', description: "独自のイベントを発生させる" },
      { command: 'New-Event -SourceIdentifier "MyEvent"', description: "監視側のテスト用にイベントを手動で発生させる" }
    ],
    tags: ["イベント発生", "カスタムイベント作成"]
  },
  {
    id: "get-event", name: "Get-Event", category: "event",
    summary: "発生してキューに残っているイベントの一覧を取得する",
    syntax: "Get-Event [[-SourceIdentifier] <string>]",
    parameters: [
      { name: "-SourceIdentifier", description: "イベント名で絞り込む" }
    ],
    examples: [
      { command: "Get-Event", description: "発生してキューに残っているイベントの一覧を表示する" },
      { command: 'Get-Event -SourceIdentifier "MyEvent"', description: "特定のイベントだけを確認する" }
    ],
    tags: ["イベント一覧確認", "発生したイベントを見る"]
  }
];
