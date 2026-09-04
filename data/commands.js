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
  { key: "archive", label: "アーカイブ" }
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
      { command: 'Move-Item -Path "a.txt" -Destination "D:\\archive\\a.txt"', description: "ファイルを別ドライブへ移動" }
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
      { command: 'Rename-Item -Path "old.txt" -NewName "new.txt"', description: "ファイル名を変更" }
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
      { command: 'Get-Item -Path "C:\\Windows"', description: "フォルダ自体の情報（更新日時など）を表示" }
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
      { command: 'Test-Path -Path "C:\\Users\\me\\a.txt"', description: "ファイルが存在するかどうかを True/False で確認" }
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
      { command: 'Set-Content -Path "memo.txt" -Value "こんにちは"', description: "ファイルの内容を上書きする" }
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
      { command: 'Add-Content -Path "log.txt" -Value "処理完了"', description: "ログファイルの末尾に1行追加" }
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
      { command: 'Clear-Content -Path "log.txt"', description: "ログファイルの内容だけを空にする" }
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
      { command: "Get-Location", description: "現在の作業フォルダのフルパスを表示" }
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
      { command: 'Push-Location -Path "C:\\Temp"', description: "現在地を保存してTempフォルダへ移動" }
    ],
    tags: ["場所を保存して移動", "一時的に移動", "pushd"]
  },
  {
    id: "pop-location", name: "Pop-Location", aliases: ["popd"], category: "location",
    summary: "Push-Locationで記憶した元の場所に戻る",
    syntax: "Pop-Location",
    parameters: [],
    examples: [
      { command: "Pop-Location", description: "直前にPush-Locationで保存した場所に戻る" }
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
      { command: 'Join-Path -Path "C:\\Users" -ChildPath "me"', description: '"C:\\Users\\me" というパス文字列を作る' }
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
      { command: 'Split-Path -Path "C:\\Users\\me\\a.txt" -Leaf', description: '"a.txt" というファイル名だけを取得' }
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
      { command: 'Resolve-Path -Path ".\\..\\data"', description: "相対パスを絶対パスに変換する" }
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
      { command: 'Convert-Path -Path ".\\"', description: "現在の場所を標準のファイルシステムパスに変換" }
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
      { command: "Wait-Process -Name notepad", description: "メモ帳が閉じられるまで処理を待機する" }
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
      { command: "Start-Service -Name wuauserv", description: "Windows Update サービスを開始する" }
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
      { command: "Stop-Service -Name wuauserv", description: "Windows Update サービスを停止する" }
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
      { command: "Restart-Service -Name wuauserv", description: "サービスを一度停止してから再度開始する" }
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
      { command: 'Set-Service -Name wuauserv -StartupType Manual', description: "サービスの起動方法を手動に変更する" }
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
      { command: "Suspend-Service -Name ServiceName", description: "対応するサービスを一時停止する" }
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
      { command: "Resume-Service -Name ServiceName", description: "一時停止していたサービスを再開する" }
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
      { command: "Test-Connection -TargetName google.com", description: "google.comに通信できるか確認する（ping）" }
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
      { command: "Test-NetConnection -ComputerName example.com -Port 443", description: "指定ポートで通信できるか確認する" }
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
      { command: "Get-NetIPAddress -AddressFamily IPv4", description: "現在のIPv4アドレスを確認する" }
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
      { command: "Get-NetAdapter", description: "すべてのネットワークアダプターの状態を表示" }
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
      { command: "Resolve-DnsName -Name example.com", description: "ドメイン名に対応するIPアドレスを調べる" }
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
      { command: "Get-NetTCPConnection -State Established", description: "現在接続中のTCP通信一覧を表示" }
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
      { command: 'Invoke-RestMethod -Uri "https://api.example.com/data"', description: "APIからJSONデータを取得し、そのままオブジェクトとして扱う" }
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
      { command: 'Get-ItemProperty -Path "HKCU:\\Environment"', description: "指定レジストリキーの値を取得する" }
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
      { command: 'Set-ItemProperty -Path "HKCU:\\Environment" -Name "MyVar" -Value "1"', description: "レジストリ値を設定する" }
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
      { command: 'New-ItemProperty -Path "HKCU:\\Environment" -Name "MyVar" -Value "1" -PropertyType String', description: "新しいレジストリ値を作成する" }
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
      { command: 'Remove-ItemProperty -Path "HKCU:\\Environment" -Name "MyVar"', description: "レジストリ値を削除する" }
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
      { command: 'Copy-ItemProperty -Path "HKCU:\\A" -Destination "HKCU:\\B" -Name "MyVar"', description: "レジストリ値を別のキーへコピーする" }
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
      { command: 'Rename-ItemProperty -Path "HKCU:\\Environment" -Name "MyVar" -NewName "MyVar2"', description: "レジストリ値の名前を変更する" }
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
      { command: "Get-Process | Select-Object -First 1 | ConvertTo-Json", description: "プロセス情報をJSON文字列として出力する" }
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
      { command: '\'{"name":"test"}\' | ConvertFrom-Json', description: "JSON文字列をオブジェクトに変換してプロパティにアクセスできるようにする" }
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
      { command: "Get-Process | ConvertTo-Csv -NoTypeInformation", description: "プロセス一覧をCSV形式の文字列に変換する" }
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
      { command: "Get-Content data.csv | ConvertFrom-Csv", description: "CSVファイルの内容をオブジェクトの配列として扱う" }
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
      { command: 'Get-Process | Export-Csv -Path "process.csv" -NoTypeInformation', description: "プロセス一覧をCSVファイルとして保存する" }
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
      { command: 'Import-Csv -Path "data.csv"', description: "CSVファイルを読み込み、各行をオブジェクトとして扱う" }
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
      { command: 'Get-Process | Out-File -FilePath "result.txt"', description: "プロセス一覧の表示結果をテキストファイルに保存する" }
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
      { command: 'Select-String -Path "*.log" -Pattern "Error"', description: "logファイルの中から Error を含む行を検索する" }
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
      { command: "Get-Variable", description: "現在定義されている変数を一覧表示する" }
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
      { command: 'Set-Variable -Name "count" -Value 10', description: "変数countに10を設定する" }
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
      { command: 'New-Variable -Name "greeting" -Value "こんにちは"', description: "新しい変数を作成して初期値を設定する" }
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
      { command: 'Remove-Variable -Name "count"', description: "変数countを削除する" }
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
      { command: 'Clear-Variable -Name "count"', description: "変数countの値を空にする" }
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
      { command: "Get-Process | Sort-Object -Property CPU -Descending", description: "CPU使用量が多い順にプロセスを並べる" }
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
      { command: "Get-Process | Group-Object -Property Company", description: "プロセスを提供元の会社ごとにグループ化する" }
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
      { command: "Compare-Object -ReferenceObject $listA -DifferenceObject $listB", description: "2つのリストの違いを表示する" }
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
      { command: "Get-Process | Select-Object -Property Name, CPU -First 5", description: "名前とCPU使用量だけを、先頭5件表示" }
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
      { command: "Get-Process | Get-Member", description: "プロセスオブジェクトが持つプロパティ・メソッドを一覧表示する" }
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
      { command: "Get-Process | Format-Table -Property Name, CPU -AutoSize", description: "指定した列だけを見やすい表形式で表示する" }
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
      { command: "Get-Process -Name notepad | Format-List -Property *", description: "対象の全プロパティを縦に並べて詳しく表示する" }
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
      { command: "Get-ChildItem | Format-Wide -Column 4", description: "ファイル名を4列に並べて簡潔に表示する" }
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
      { command: 'Write-Output "処理を開始します"', description: "文字列をパイプラインに出力（画面に表示）する" }
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
      { command: 'Write-Host "完了しました" -ForegroundColor Green', description: "緑色の文字で完了メッセージを表示する" }
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
      { command: 'Write-Warning "設定ファイルが見つかりません"', description: "黄色い警告メッセージを表示する" }
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
      { command: 'Write-Error "処理に失敗しました"', description: "エラーメッセージを表示する" }
    ],
    tags: ["エラー表示", "エラーメッセージ"]
  },
  {
    id: "out-null", name: "Out-Null", category: "format",
    summary: "コマンドの実行結果を画面に表示せずに捨てる",
    syntax: "Command | Out-Null",
    parameters: [],
    examples: [
      { command: "New-Item -Path temp.txt -ItemType File | Out-Null", description: "作成結果のメッセージを表示させずに実行する" }
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
      { command: "Get-Module -ListAvailable", description: "インストール済みのモジュールを一覧表示する" }
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
      { command: "Import-Module -Name Az", description: "Azureモジュールを読み込んでコマンドを使えるようにする" }
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
      { command: "Install-Module -Name Az -Scope CurrentUser", description: "Azureモジュールを現在のユーザー用にインストールする" }
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
      { command: "Find-Module -Name Az*", description: "名前がAzで始まるモジュールを検索する" }
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
      { command: "Update-Module -Name Az", description: "Azureモジュールを最新版に更新する" }
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
      { command: "Uninstall-Module -Name Az", description: "Azureモジュールをアンインストールする" }
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
      { command: "Get-InstalledModule", description: "Install-Moduleでインストールしたモジュールを一覧表示する" }
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
      { command: "Invoke-Command -ComputerName Server01 -ScriptBlock { Get-Process }", description: "リモートPCでGet-Processを実行する" }
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
      { command: "New-PSSession -ComputerName Server01", description: "リモートPCとの接続セッションを作成する" }
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
      { command: "Enter-PSSession -ComputerName Server01", description: "リモートPCに接続し、そのまま対話的に操作する" }
    ],
    tags: ["リモートログイン", "対話的リモート操作"]
  },
  {
    id: "exit-pssession", name: "Exit-PSSession", category: "remoting",
    summary: "Enter-PSSessionで開いたリモート接続を終了し、ローカルに戻る",
    syntax: "Exit-PSSession",
    parameters: [],
    examples: [
      { command: "Exit-PSSession", description: "リモート接続を終了してローカルのセッションに戻る" }
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
      { command: "Get-PSSession | Remove-PSSession", description: "すべてのリモートセッションを削除する" }
    ],
    tags: ["セッション削除", "リモート切断"]
  },
  {
    id: "get-pssession", name: "Get-PSSession", category: "remoting",
    summary: "現在作成されているリモートセッションの一覧を取得する",
    syntax: "Get-PSSession",
    parameters: [],
    examples: [
      { command: "Get-PSSession", description: "作成済みのリモートセッション一覧を表示する" }
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
      { command: "Start-Job -ScriptBlock { Start-Sleep -Seconds 10 }", description: "10秒待つ処理をバックグラウンドで実行開始する" }
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
      { command: "Get-Job", description: "実行中・完了したジョブの一覧を表示する" }
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
      { command: "Get-Job | Receive-Job", description: "すべてのジョブの実行結果を取得する" }
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
      { command: "Get-Job | Stop-Job", description: "すべての実行中ジョブを停止する" }
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
      { command: "Get-Job | Remove-Job", description: "すべてのジョブ情報を削除する" }
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
      { command: "Get-Job | Wait-Job", description: "すべてのジョブが完了するまで待機する" }
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
      { command: "Get-Help Get-Process -Examples", description: "Get-Processの使用例だけを表示する" }
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
      { command: "Get-Command -Noun Service", description: "サービスに関連するコマンドをすべて検索する" }
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
      { command: "Get-History", description: "これまでに実行したコマンドの履歴を表示する" }
    ],
    tags: ["履歴表示", "コマンド履歴", "過去に実行したコマンド"]
  },
  {
    id: "clear-history", name: "Clear-History", category: "help",
    summary: "コマンドの実行履歴を消去する",
    syntax: "Clear-History",
    parameters: [],
    examples: [
      { command: "Clear-History", description: "実行履歴をすべて消去する" }
    ],
    tags: ["履歴削除", "履歴をクリア"]
  },
  {
    id: "update-help", name: "Update-Help", category: "help",
    summary: "PowerShellのヘルプファイルを最新の内容に更新する",
    syntax: "Update-Help",
    parameters: [],
    examples: [
      { command: "Update-Help", description: "インターネットから最新のヘルプファイルをダウンロードして更新する" }
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
      { command: 'Save-Help -DestinationPath "C:\\Help"', description: "ヘルプファイルを指定フォルダに保存する" }
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
      { command: 'Set-Date -Date "2026-01-01 09:00:00"', description: "システムの日時を指定した値に変更する" }
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
      { command: 'New-TimeSpan -Start "2026-01-01" -End "2026-09-04"', description: "2つの日付の間の日数・時間差を計算する" }
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
      { command: 'Get-Acl -Path "C:\\work"', description: "指定フォルダのアクセス権限一覧を表示する" }
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
      { command: '$acl = Get-Acl "C:\\work"; Set-Acl -Path "C:\\dest" -AclObject $acl', description: "あるフォルダのアクセス権を別のフォルダにコピー・適用する" }
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
      { command: "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser", description: "ローカルで作成したスクリプトの実行を許可する（よく使われる設定）" }
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
      { command: "Get-ExecutionPolicy -List", description: "現在の実行ポリシー設定を確認する" }
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
      { command: 'ConvertTo-SecureString -String "password123" -AsPlainText -Force', description: "パスワード文字列をセキュアな形式に変換する" }
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
      { command: "$secure | ConvertFrom-SecureString | Out-File cred.txt", description: "セキュア文字列を暗号化テキストとしてファイルに保存する" }
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
      { command: "$cred = Get-Credential", description: "ユーザー名とパスワードの入力ダイアログを表示し、変数に保存する" }
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
      { command: "Get-EventLog -LogName System -Newest 20", description: "システムログの最新20件を表示する" }
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
      { command: "Get-WinEvent -LogName Application -MaxEvents 10", description: "アプリケーションログの最新10件を表示する" }
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
      { command: "Clear-EventLog -LogName Application", description: "アプリケーションログをすべて消去する" }
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
      { command: 'Write-EventLog -LogName Application -Source "MyApp" -Message "処理完了" -EntryType Information', description: "アプリケーションログに情報イベントを書き込む" }
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
      { command: 'New-EventLog -LogName Application -Source "MyApp"', description: "アプリケーションログに新しいイベントソースを登録する" }
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
      { command: "Get-ComputerInfo", description: "PCのハードウェア・OS情報をまとめて表示する" }
    ],
    tags: ["PC情報確認", "システム情報", "OS情報", "スペック確認"]
  },
  {
    id: "get-host", name: "Get-Host", category: "system",
    summary: "現在使用しているPowerShellのバージョンやコンソール設定情報を取得する",
    syntax: "Get-Host",
    parameters: [],
    examples: [
      { command: "Get-Host", description: "PowerShellのバージョン情報などを表示する" }
    ],
    tags: ["PowerShellバージョン確認", "ホスト情報"]
  },
  {
    id: "get-culture", name: "Get-Culture", category: "system",
    summary: "現在使用されている言語・地域（カルチャ）の設定を取得する",
    syntax: "Get-Culture",
    parameters: [],
    examples: [
      { command: "Get-Culture", description: "現在のロケール設定（例: ja-JP）を表示する" }
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
      { command: "Get-Random -Minimum 1 -Maximum 100", description: "1以上100未満のランダムな整数を生成する" }
    ],
    tags: ["ランダムな数字", "乱数生成", "くじ引き"]
  },
  {
    id: "get-hotfix", name: "Get-HotFix", category: "system",
    summary: "インストールされているWindows Update（修正プログラム）の一覧を取得する",
    syntax: "Get-HotFix",
    parameters: [],
    examples: [
      { command: "Get-HotFix", description: "適用済みのWindows Updateの一覧を表示する" }
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
      { command: "Get-CimInstance -ClassName Win32_BIOS", description: "BIOS情報を取得する" }
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
      { command: "Restart-Computer -Force", description: "このPCを確認なしで再起動する" }
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
      { command: "Stop-Computer -Force", description: "このPCを確認なしでシャットダウンする" }
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
      { command: "Rename-Computer -NewName PC-NEW01 -Restart", description: "PC名を変更してすぐに再起動する" }
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
      { command: 'Compress-Archive -Path "C:\\work\\*" -DestinationPath "work.zip"', description: "フォルダの中身をZIPファイルに圧縮する" }
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
      { command: 'Expand-Archive -Path "work.zip" -DestinationPath "C:\\work"', description: "ZIPファイルを指定フォルダに展開する" }
    ],
    tags: ["ZIP解凍", "展開する", "解凍する", "圧縮ファイルを開く"]
  }
];
